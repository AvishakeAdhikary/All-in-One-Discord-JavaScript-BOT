export default {
	name: 'playerSkip',
	async execute(queue, track) {
		await queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
	},
};