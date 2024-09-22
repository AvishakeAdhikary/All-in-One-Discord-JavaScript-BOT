import { SlashCommandBuilder } from 'discord.js';
import Birthday from '../../database/models/birthday.js';

export default {
    category: 'birthday',
    data: new SlashCommandBuilder()
        .setName('checkbirthday')
        .setDescription('Check your birthday.'),
    async execute(interaction) {
        try {
            const birthdayData = await Birthday.findOne({ userId: interaction.user.id });
            if (!birthdayData) {
                return await interaction.reply('You have not set a birthday yet. Use `/setbirthday` to set one!');
            }

            const bday = birthdayData;
            const birthday = new Date(`${bday.year ? bday.year : ""}-${bday.month}-${bday.day}`);
            await interaction.reply(`Your birthday is on ${birthday.toLocaleDateString()}.`);
        } catch (error) {
            console.error('Error checking birthday:', error);
            await interaction.reply('There was an error checking your birthday. Please try again later.');
        }
    },
};
