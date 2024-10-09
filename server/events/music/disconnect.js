import { EmbedBuilder } from 'discord.js';

export default {
    name: 'disconnect',
    category: 'music',
    async execute(queue) {
        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`Disconnected`)
            .setDescription(`The bot has disconnected from the voice channel.`)
            .setTimestamp();

        await queue.metadata.send({ embeds: [embed] });
    },
};
