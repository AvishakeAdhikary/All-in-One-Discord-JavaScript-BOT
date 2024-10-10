import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a random joke!'),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
            const joke = response.data;

            const reply = joke.type === 'single' ? joke.joke : `${joke.setup} - ${joke.delivery}`;
            await interaction.followUp(reply);
        } catch (error) {
            console.error(`Error fetching joke: ${error}`);
            await interaction.followUp("Sorry, I couldn't fetch a joke right now.");
        }
    },
};
