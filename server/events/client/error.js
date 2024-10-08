import { Events } from 'discord.js';

export default {
	name: Events.Error,
	execute(err) {
		console.log(`Error Occured: ${err}`);
	},
};