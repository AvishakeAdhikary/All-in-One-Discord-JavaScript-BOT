import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { globby } from 'globby';
import discord from 'discord.js';

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.MessageContent, discord.GatewayIntentBits.GuildPresences] });

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('Scanning commands and events from directory:', __dirname);

// Use globby to get event files
const eventPatterns = join(__dirname, 'events', '**', '*.js');
const eventFiles = await globby(eventPatterns);
const filteredEventFiles = eventFiles.filter(file => !file.endsWith('index.js'));

for (const file of filteredEventFiles) {
    const event = await import(file);
    client.on(event.default.name, event.default.bind(null, client));
}

// Use globby to get command files
const commandPatterns = join(__dirname, 'commands', '**', '*.js');
const commandFiles = await globby(commandPatterns);
const filteredCommandFiles = commandFiles.filter(file => !file.endsWith('index.js'));

client.commands = new Map();
for (const file of filteredCommandFiles) {
    const command = await import(file);
    client.commands.set(command.default.data.name, command);
}

export default client;
