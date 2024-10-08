export default {
	name: 'disconnect',
	async execute(queue) {
		await queue.metadata.send('Looks like my job here is done, leaving now!');
	},
};