import { EmbedBuilder } from 'discord.js';

export default {
    name: 'audioTrackAdd',
    category: 'music',
    async execute(queue, track) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Track Added`)
            .setDescription(`**${track.title}** has been added to the queue!`)
            .setThumbnail(track.thumbnail)
            .setTimestamp();

        await queue.metadata.send({ embeds: [embed] });
    },
};
