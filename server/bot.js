import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { globby } from 'globby';
import discord from 'discord.js';

const client = new discord.Client({ 
    intents: [
        discord.GatewayIntentBits.Guilds, 
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildPresences
    ] 
});

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('Scanning commands and events from directory:', __dirname);

const eventFiles = await globby("./server/events/**/*.js");
const filteredEventFiles = eventFiles.filter(file => !file.endsWith('index.js'));

console.log(`Found ${filteredEventFiles.length} event files.`)

for (const file of filteredEventFiles) {
    const eventModule = await import("./"+file.split('./server/')[1]);
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

const commandFiles = await globby("./server/commands/**/*.js");
const filteredCommandFiles = commandFiles.filter(file => !file.endsWith('index.js'));

console.log(`Found ${filteredCommandFiles.length} command files.`)

client.commands = new discord.Collection();
for (const file of filteredCommandFiles) {
    const commandModule = await import("./"+file.split('./server/')[1]);
    const command = commandModule.default || commandModule;
    if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
    }
}

export default client;
