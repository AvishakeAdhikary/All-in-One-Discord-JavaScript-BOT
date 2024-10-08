import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { globby } from 'globby';
import discord from 'discord.js';
import { Routes } from 'discord-api-types/v10';
import dotenv from 'dotenv';
import { Player } from 'discord-player';

dotenv.config();

console.log("Current working directory for bot:", process.cwd())

// Initialize Discord client
const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.AutoModerationConfiguration,
        discord.GatewayIntentBits.AutoModerationExecution,
        discord.GatewayIntentBits.DirectMessagePolls,
        discord.GatewayIntentBits.DirectMessageReactions,
        discord.GatewayIntentBits.DirectMessageTyping,
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.GuildEmojisAndStickers,
        discord.GatewayIntentBits.GuildIntegrations,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessagePolls,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildModeration,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.GuildScheduledEvents,
        discord.GatewayIntentBits.GuildVoiceStates,
        discord.GatewayIntentBits.GuildWebhooks,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.MessageContent,
    ]
});

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('Scanning commands and events from directory:', __dirname);

const player = new Player(client);
try {
    await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');
} catch (e) {
    console.log(`Error occured while extracting music player: ${e}`);
}

export async function loadCommands(rest, fullReload = false) {
    try {
        if (!client.user || !client.user.id) {
            throw new Error('Client user ID is not available. Ensure the bot is logged in.');
        }

        const commands = await rest.get(Routes.applicationCommands(client.user.id));

        if (!commands || !Array.isArray(commands)) {
            throw new Error('Failed to fetch commands. Response was not an array.');
        }

        if (fullReload) {
            for (const command of commands) {
                try {
                    if (command.id) {
                        await rest.delete(Routes.applicationCommand(client.user.id, command.id));
                        console.log(`Deleted old command: ${command.name}`);
                    } else {
                        console.warn(`Skipping command deletion: Command ID is missing.`);
                    }
                } catch (error) {
                    console.error(`Error deleting command ${command.name}:`, error);
                }
            }
        }

        const commandFiles = await globby("./server/commands/**/*.js");
        const filteredCommandFiles = commandFiles.filter(file => !file.endsWith('index.js'));

        console.log(`Found ${filteredCommandFiles.length} command files.`);

        client.commands = new discord.Collection();
        const commandsData = [];

        for (const file of filteredCommandFiles) {
            const commandModule = await import("./" + file.split('./server/')[1]);
            const command = commandModule.default || commandModule;
            if (command.data && command.execute) {
                client.commands.set(command.data.name, command);
                commandsData.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
            }
        }

        await rest.put(Routes.applicationCommands(client.user.id), { body: commandsData });
        console.log('Successfully registered new commands.');
    } catch (error) {
        console.error('Error while loading and registering commands:', error);
    }
}

export async function loadEvents(rest) {
    const eventFiles = await globby("./server/events/**/*.js");
    const filteredEventFiles = eventFiles.filter(file => !file.endsWith('index.js'));

    console.log(`Found ${filteredEventFiles.length} event files.`);

    for (const file of filteredEventFiles) {
        const eventModule = await import("./" + file.split('./server/')[1]);
        const event = eventModule.default || eventModule;
        if (!event || !event.name || typeof event.execute !== 'function') {
            console.warn(`Event file ${file} is missing required properties.`);
            continue;
        }
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

export default client;
