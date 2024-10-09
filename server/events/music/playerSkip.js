import { EmbedBuilder } from 'discord.js';

export default {
    name: 'playerSkip',
    category: 'music',
    async execute(queue, track) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Track Skipped`)
            .setDescription(`**${track.title}** has been skipped.`)
            .setTimestamp();

        await queue.metadata.send({ embeds: [embed] });
    },
};
