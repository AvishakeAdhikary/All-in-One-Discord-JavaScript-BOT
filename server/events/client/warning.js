import { Events } from 'discord.js';

export default {
	name: Events.Warn,
	execute(message) {
		console.log(`Warning: ${message}`);
	},
};