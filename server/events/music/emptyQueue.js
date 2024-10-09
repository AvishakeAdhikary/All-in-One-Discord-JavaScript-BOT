import { EmbedBuilder } from 'discord.js';

export default {
    name: 'emptyQueue',
    category: 'music',
    async execute(queue) {
        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle(`Queue Empty`)
            .setDescription(`The queue is now empty. Use the /play command to add more tracks!`)
            .setTimestamp();

        await queue.metadata.send({ embeds: [embed] });
    },
};
