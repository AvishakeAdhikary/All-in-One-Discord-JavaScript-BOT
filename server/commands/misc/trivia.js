import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import he from 'he';

export default {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Get a random trivia question!'),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
            const question = response.data.results[0];
            const decodedQuestion = he.decode(question.question);
            const options = [...question.incorrect_answers, question.correct_answer];
            options.sort(() => Math.random() - 0.5);

            const buttons = options.map((opt, index) => ({
                type: 2,
                label: he.decode(opt),
                style: 1,
                custom_id: `${opt}|${question.correct_answer}`,
            }));

            const embed = {
                title: 'Trivia Question',
                description: decodedQuestion,
                color: 0x00AE86,
            };

            await interaction.followUp({ embeds: [embed], components: [{ type: 1, components: buttons }] });

            const filter = i => buttons.some(button => i.customId.startsWith(button.custom_id.split('|')[0]));
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

            collector.on('collect', async i => {
                const [selectedAnswer, correctAnswer] = i.customId.split('|');

                await i.deferUpdate();
                const isCorrect = selectedAnswer === correctAnswer;

                await i.followUp({
                    content: isCorrect ? '✅ Correct!' : `❌ Incorrect! The correct answer was: ${correctAnswer}.`,
                    ephemeral: true,
                });

                collector.stop();
            });

            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.channel.send('⏳ Time is up! No one answered in time.');
                }
                interaction.editReply({ components: [{ type: 1, components: buttons.map(button => ({ ...button, disabled: true })) }] });
            });
        } catch (error) {
            console.error(`Error fetching trivia: ${error}`);
            await interaction.followUp("Sorry, I couldn't fetch a trivia question right now.");
        }
    },
};
