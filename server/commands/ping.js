import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!');

export const execute = async (client, interaction) => {
    await interaction.reply('Pong!')
}