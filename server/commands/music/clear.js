import { SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear the queue.'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild);
        if (!queue) {
            return interaction.reply({ content: `No queue found for this guild ${interaction.member}` });
        }

        queue.tracks.clear();

        return interaction.reply({ content: `Cleared the queue!` });
    },
};
