import { EmbedBuilder } from 'discord.js';

export default {
    name: 'emptyChannel',
    category: 'music',
    async execute(queue) {
        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle(`Channel Empty`)
            .setDescription(`No users are in the voice channel. The queue will now be paused.`)
            .setTimestamp();

        await queue.metadata.send({ embeds: [embed] });
    },
};
