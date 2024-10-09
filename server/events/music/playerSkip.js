export default {
	name: 'playerSkip',
	category: 'music',
	async execute(queue, track) {
		await queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
	},
};