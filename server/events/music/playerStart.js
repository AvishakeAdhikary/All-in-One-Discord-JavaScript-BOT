import { EmbedBuilder } from "discord.js";

export default {
	name: 'playerStart',
	category: 'music',
	async execute(queue, track) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Started playing: **${track.title}**`)
            .setImage(track.thumbnail)
            .setTimestamp();

        const message = await queue.metadata.send({ embeds: [embed] });
        queue.metadata.messageId = message.id;
    },
};