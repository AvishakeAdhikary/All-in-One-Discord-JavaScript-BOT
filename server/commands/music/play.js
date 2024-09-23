import { SlashCommandBuilder } from 'discord.js';
import { player } from '../../bot.js';

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from YouTube or any other supported source.')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The song title or URL to play')
                .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');

        if (!interaction.member.voice.channel) {
            return await interaction.reply('You need to be in a voice channel to play music!');
        }

        return await interaction.reply("I'm yet to be implemented.");
    },
};
