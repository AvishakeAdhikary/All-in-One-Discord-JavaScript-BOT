import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Get a random waifu picture!'),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            const imageUrl = response.data.url;
            await interaction.followUp({ content: 'Here\'s a waifu picture for you!', files: [imageUrl] });
        } catch (error) {
            console.error(`Error fetching waifu image: ${error}`);
            await interaction.followUp("Sorry, I couldn't fetch a waifu picture right now.");
        }
    },
};
