import { SlashCommandBuilder } from 'discord.js';
import { player } from '../../bot.js';

export default {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the currently playing song.'),
    async execute(interaction) {
        return await interaction.reply("I'm yet to be implemented.");
    },
};
