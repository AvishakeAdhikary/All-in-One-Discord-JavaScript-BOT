import { SlashCommandBuilder } from 'discord.js';
import WelcomeSettings from '../../database/models/welcomeSettings.js';

export default {
    category: 'welcome',
    data: new SlashCommandBuilder()
        .setName('setwelcomechannel')
        .setDescription('Set the channel for welcome greetings.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Select a channel for welcome greetings')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            return await interaction.reply('You do not have permission to set the welcome channel.');
        }

        const channelId = interaction.options.getChannel('channel').id;

        try {
            await WelcomeSettings.findOneAndUpdate(
                { guildId: interaction.guild.id },
                { channelId: channel.id },
                { upsert: true, new: true }
            );

            await interaction.reply({ content: `Welcome greetings will now be sent to <#${channelId}>!`, ephemeral: true });
        } catch (error) {
            console.error('Error setting welcome channel:', error);
            await interaction.reply('There was an error setting the welcome channel. Please try again later.');
        }
    },
};