export default {
	name: 'playerStart',
	async execute(queue, track) {
		await queue.metadata.send(`Started playing: **${track.title}**`);
	},
};