import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await interaction.reply(`This command was run by ${interaction.user.toString()}, who joined on \`${interaction.member.joinedAt}\`.`);
	},
};
