import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the currently paused song.'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild);
        if (!queue?.isPlaying()) {
            return interaction.reply({ content: `No music currently playing ${interaction.member}` });
        }

        if (!queue.node.isPaused()) {
            return interaction.reply({ content: `The music is already playing, ${interaction.member}.` });
        }

        queue.node.resume();

        const embedding = new EmbedBuilder()
            .setColor('#00ff00')
            .setDescription(`Resumed the current music \`${queue.currentTrack.title}\` by ${interaction.member}.`);

        return interaction.reply({ embeds: [embedding] });
    },
};
