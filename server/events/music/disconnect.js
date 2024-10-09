export default {
	name: 'disconnect',
	category: 'music',
	async execute(queue) {
		await queue.metadata.send('Looks like my job here is done, leaving now!');
	},
};