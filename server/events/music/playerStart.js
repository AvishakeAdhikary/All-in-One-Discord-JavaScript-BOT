import { EmbedBuilder } from "discord.js";

export default {
	name: 'playerStart',
	category: 'music',
	async execute(queue, track) {
		await queue.metadata.send(`Started playing: **${track.title}**`);
	},
};