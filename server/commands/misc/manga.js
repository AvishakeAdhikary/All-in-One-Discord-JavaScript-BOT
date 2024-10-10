import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('manga')
        .setDescription('Get a random manga from Kitsu!'),
    async execute(interaction) {
        await interaction.deferReply(); // Defer the reply

        try {
            // Fetch a random manga from Kitsu
            const response = await axios.get('https://kitsu.io/api/edge/manga', {
                params: {
                    page: {
                        limit: 1,
                        offset: Math.floor(Math.random() * 10000) // Random offset
                    }
                }
            });

            // Access the manga data from the response
            const mangaList = response.data.data;
            if (!mangaList || mangaList.length === 0) {
                await interaction.followUp("No manga found.");
                return;
            }

            // Get the first manga
            const manga = mangaList[0];
            const mangaTitle = manga.attributes.titles.en || manga.attributes.titles.en_jp || manga.attributes.titles.ja || manga.attributes.titles.ja_jp || "Untitled";
            const mangaDescription = manga.attributes.description || "No description available.";
            const coverImage = manga.attributes.posterImage.original;

            // Create an embed message
            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setTitle(mangaTitle)
                .setDescription(mangaDescription)
                .setURL(`https://kitsu.io/manga/${manga.id}`)
                .setTimestamp();

            // Add cover image if it exists
            if (coverImage) {
                embed.setImage(coverImage);
            } else {
                embed.setFooter({ text: "No cover image available." });
            }

            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            console.error(`Error fetching manga: ${error}`);
            await interaction.followUp("Sorry, I couldn't fetch a manga right now.");
        }
    },
};
