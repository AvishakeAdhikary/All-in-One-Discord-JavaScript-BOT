export default {
	name: 'audioTracksAdd',
	async execute(queue, track) {
		await queue.metadata.send(`Multiple Track's queued`);
	},
};