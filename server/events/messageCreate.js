import { Events } from 'discord.js';

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;

        const prefix = '!';
        
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = message.client.commands.get(commandName);

        if (!command) {
            console.error(`No command matching ${commandName} was found.`);
            return;
        }

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            await message.reply('There was an error while executing this command!');
        }
    },
};
