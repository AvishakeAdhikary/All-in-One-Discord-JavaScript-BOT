export default {
	name: 'audioTrackAdd',
	async execute(queue, track) {
		await queue.metadata.send(`Track **${track.title}** queued`);
	},
};