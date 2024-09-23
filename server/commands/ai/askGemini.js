import { SlashCommandBuilder } from 'discord.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default {
    data: new SlashCommandBuilder()
        .setName('askgemini')
        .setDescription('Ask your queries to Google Gemini.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Your question or query')
                .setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply(`${interaction.user}, you asked: \`${message}\``);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent([message]);

            const answer = result.response.text();
            if (answer) {
                await interaction.followUp(answer);
            } else {
                await interaction.followUp("Failed to get a valid response from Google Gemini.");
            }
        } catch (error) {
            console.error(`Error occurred while generating response: ${error}`);
            await interaction.followUp("An error occurred while processing your request. Please try again later.");
        }
    },
};
