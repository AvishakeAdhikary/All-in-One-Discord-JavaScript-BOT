import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show the currently playing song.'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild);
        if (!queue?.isPlaying()) {
            return interaction.reply({ content: `No music currently playing ${interaction.member}` });
        }

        const embedding = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(`Now playing: \`${queue.currentTrack.title}\` by \`${queue.currentTrack.author}\``)
            .setImage(queue.currentTrack.thumbnail)
            .setTimestamp();

        return interaction.reply({ embeds: [embedding] });
    },
};
