export default {
	name: 'emptyQueue',
	category: 'music',
	async execute(queue) {
		await queue.metadata.send('Queue finished!');
	},
};