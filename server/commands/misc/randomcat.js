import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('randomcat')
        .setDescription('Get a random cat picture!'),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            const catImageUrl = response.data[0].url;

            await interaction.followUp({ content: 'Here\'s a random cat picture!', files: [catImageUrl] });
        } catch (error) {
            console.error(`Error fetching random cat: ${error}`);
            await interaction.followUp("Sorry, I couldn't fetch a random cat picture right now.");
        }
    },
};
