import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('randomdog')
        .setDescription('Get a random dog picture!'),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            const dogImageUrl = response.data.message;

            await interaction.followUp({ content: 'Here\'s a random dog picture!', files: [dogImageUrl] });
        } catch (error) {
            console.error(`Error fetching random dog: ${error}`);
            await interaction.followUp("Sorry, I couldn't fetch a random dog picture right now.");
        }
    },
};
