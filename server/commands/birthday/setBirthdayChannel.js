import { SlashCommandBuilder } from 'discord.js';
import BirthdaySettings from '../../database/models/birthdaySettings.js';

export default {
    category: 'birthday',
    data: new SlashCommandBuilder()
        .setName('setbirthdaychannel')
        .setDescription('Set the channel for birthday wishes.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Select a channel for birthday wishes')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            return await interaction.reply('You do not have permission to set the birthday channel.');
        }

        const channelId = interaction.options.getChannel('channel').id;

        try {
            await BirthdaySettings.findOneAndUpdate(
                { guildId: interaction.guild.id },
                { channelId },
                { upsert: true, new: true }
            );

            await interaction.reply(`Birthday wishes will now be sent to <#${channelId}>!`);
        } catch (error) {
            console.error('Error setting birthday channel:', error);
            await interaction.reply('There was an error setting the birthday channel. Please try again later.');
        }
    },
};
