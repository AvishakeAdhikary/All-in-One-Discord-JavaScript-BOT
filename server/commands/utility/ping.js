import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the bot\'s latency!'),
	async execute(interaction) {
		const sentMessage = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const latency = sentMessage.createdTimestamp - interaction.createdTimestamp;
		const apiLatency = interaction.client.ws.ping;
		if(!interaction.editReply)
		{
			await interaction.reply({
				content: `🏓 Pong! Latency is ${latency}ms. API latency is ${apiLatency}ms.`,
			});
		}
		else{
			await interaction.editReply({
				content: `🏓 Pong! Latency is ${latency}ms. API latency is ${apiLatency}ms.`,
			});
		}
	},
};
