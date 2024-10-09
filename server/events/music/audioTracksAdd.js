export default {
	name: 'audioTracksAdd',
	category: 'music',
	async execute(queue, track) {
		await queue.metadata.send(`Multiple Track's queued`);
	},
};