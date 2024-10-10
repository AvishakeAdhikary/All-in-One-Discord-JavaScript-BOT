import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get an inspirational quote!'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            const quote = response.data;

            await interaction.reply(`*"${quote.content}"* - **${quote.author}**`);
        } catch (error) {
            console.error(`Error fetching quote: ${error}`);
            await interaction.reply("Sorry, I couldn't fetch a quote right now.");
        }
    },
};
