import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the currently playing song.'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild);
        if (!queue?.isPlaying()) {
            return interaction.reply({ content: `No music currently playing ${interaction.member}` });
        }

        queue.node.pause();

        const embedding = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(`Paused the current music \`${queue.currentTrack.title}\` by ${interaction.member}.`);

        return interaction.reply({ embeds: [embedding] });
    },
};
