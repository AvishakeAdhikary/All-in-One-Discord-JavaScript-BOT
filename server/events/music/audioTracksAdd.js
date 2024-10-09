import { EmbedBuilder } from 'discord.js';

export default {
    name: 'audioTracksAdd',
    category: 'music',
    async execute(queue, tracks) {
        const trackTitles = tracks.map((track, index) => `${index + 1}. \`${track.title}\``).join('\n');
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Tracks Added`)
            .setDescription(`${trackTitles} have been added to the queue!`)
            .setTimestamp();

        await queue.metadata.send({ embeds: [embed] });
    },
};
