import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get an inspirational quote!'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
            const quote = response.data;

            // Check if the quote text is available
            const quoteText = quote.quoteText || "No quote found.";
            const author = quote.quoteAuthor || "Unknown";

            await interaction.reply(`*"${quoteText}"* - **${author}**`);
        } catch (error) {
            console.error(`Error fetching quote: ${error}`);
            await interaction.reply("Sorry, I couldn't fetch a quote right now.");
        }
    },
};
