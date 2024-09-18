import discord, { Events } from 'discord.js';

export default {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({
			activities: [{
				type: discord.ActivityType.Playing,
				name: "It's going to be Legen-wait-for-it-Dary. LEGENDARY!!!",
				state: "https://avishakeadhikary.github.io/",
				url: 'https://avishakeadhikary.github.io/',
			}],
			afk: false,
			status: discord.PresenceUpdateStatus.Online,
		})
	},
};
