import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('genshin')
        .setDescription('Get information about a Genshin Impact character.')
        .addStringOption(option =>
            option.setName('character')
                .setDescription('Name of the character')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply(); // Defer the reply

        const characterName = interaction.options.getString('character').toLowerCase();

        try {
            const response = await axios.get(`https://genshin.jmp.blue/characters/${characterName}`);
            const character = response.data;

            // Handle potential missing fields
            const embed = {
                title: character.name || 'Unknown Character',
                description: character.description || 'No description available.',
                color: 0x00AE86,
                fields: [
                    { name: 'Element', value: character.element || 'N/A', inline: true },
                    { name: 'Weapon', value: character.weapon || 'N/A', inline: true },
                    { name: 'Rarity', value: `⭐️ ${character.rarity || 'N/A'}`, inline: true },
                    { name: 'Affiliation', value: character.affiliation || 'N/A', inline: true },
                    { name: 'Constellation', value: character.constellation || 'N/A', inline: true },
                ].filter(field => field.value !== 'N/A'), // Filter out fields that are not applicable
                thumbnail: {
                    url: character.icon || '', // Optional thumbnail
                },
            };

            // Check if there are any fields to show
            if (embed.fields.length === 0) {
                embed.fields.push({ name: 'Info', value: 'No additional information available.', inline: false });
            }

            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            console.error(`Error fetching character info: ${error}`);
            await interaction.followUp("Sorry, I couldn't find that character. Please make sure the name is correct.");
        }
    },
};
