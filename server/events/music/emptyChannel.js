export default {
	name: 'emptyChannel',
	category: 'music',
	async execute(queue) {
		await queue.metadata.send(`Leaving because no vc activity for the past 5 minutes`);
	},
};