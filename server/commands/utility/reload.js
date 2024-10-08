import { SlashCommandBuilder } from 'discord.js';
import { loadCommands } from '../../bot.js';
import discord from 'discord.js'
import dotenv from 'dotenv';

dotenv.config();

export default {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads the bot commands.')
        .setDefaultMemberPermissions(8),
    async execute(interaction) {
        const rest = new discord.REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
        await interaction.deferReply();
        await loadCommands(rest, true);
        await interaction.followUp('Commands reloaded successfully.');
    },
};

