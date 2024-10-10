import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('narutocharacter')
        .setDescription('Get information about a random Naruto character!'),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await axios.get('https://dattebayo-api.onrender.com/characters');

            // Access the characters array from the response
            const characters = response.data.characters;

            // Check if the characters array is not empty
            if (!Array.isArray(characters) || characters.length === 0) {
                await interaction.followUp("No characters found.");
                return;
            }

            // Randomly select a character
            const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

            // Safely access character details
            const characterName = randomCharacter.name || "Unknown Character";
            const debut = randomCharacter.debut ? `Debut: ${randomCharacter.debut.manga}` : "No debut information available.";
            const village = randomCharacter.personal.affiliation ? randomCharacter.personal.affiliation.join(', ') : "Unknown Village";
            const imageUrl = randomCharacter.images[0];

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(characterName)
                .setDescription(debut)
                .addFields(
                    { name: 'Village Affiliation', value: village, inline: true }
                )
                .setImage(imageUrl)
                .setTimestamp();

            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            console.error(`Error fetching character: ${error}`);
            await interaction.followUp("Sorry, I couldn't fetch a character right now.");
        }
    },
};
