import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and clear the queue.'),
    async execute(interaction) {
        return await interaction.reply("I'm yet to be implemented.");
    },
};
