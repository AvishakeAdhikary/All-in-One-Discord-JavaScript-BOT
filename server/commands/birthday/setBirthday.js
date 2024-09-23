import { SlashCommandBuilder } from 'discord.js';
import Birthday from '../../database/models/birthday.js';

export default {
    category: 'birthday',
    data: new SlashCommandBuilder()
        .setName('setbirthday')
        .setDescription('Set your birthday.')
        .addIntegerOption(option =>
            option.setName('day')
                .setDescription('Day of your birthday (1-31)')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('month')
                .setDescription('Month of your birthday (1-12)')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('year')
                .setDescription('Year of your birthday (optional)')),
    async execute(interaction) {
        const day = interaction.options.getInteger('day');
        const month = interaction.options.getInteger('month');
        const year = interaction.options.getInteger('year');
        
        try {
            const birthdayData = await Birthday.findOneAndUpdate(
                { userId: interaction.user.id },
                { day, month, year },
                { upsert: true, new: true }
            );

            await interaction.reply({ content: `Your birthday has been set to ${day}/${month}${year ? `/${year}` : ''}.`, ephimeral: true });
        } catch (error) {
            console.error('Error setting birthday:', error);
            await interaction.reply('There was an error setting your birthday. Please try again later.');
        }
    },
};
