export default {
	name: 'emptyQueue',
	async execute(queue) {
		await queue.metadata.send('Queue finished!');
	},
};