export default {
	name: 'audioTrackAdd',
	category: 'music',
	async execute(queue, track) {
		await queue.metadata.send(`Track **${track.title}** queued`);
	},
};