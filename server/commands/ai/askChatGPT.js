import { SlashCommandBuilder } from 'discord.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default {
    data: new SlashCommandBuilder()
        .setName('askchatgpt')
        .setDescription('Ask your queries to OpenAI ChatGPT.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Your question or query')
                .setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply(`${interaction.user}, you asked: \`${message}\``);

        try {
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant imitating Barney Stinson from How I Met Your Mother." },
                    { role: "user", content: message }
                ]
            });

            const response = chatCompletion.choices[0].message.content;

            if (response) {
                await interaction.followUp(response);
            } else {
                await interaction.followUp("Failed to get a valid response from OpenAI ChatGPT.");
            }
        } catch (error) {
            console.error(`Error occurred while generating response: ${error}`);
            await interaction.followUp("An error occurred while processing your request. Please try again later.");
        }
    },
};
