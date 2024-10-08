import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help for the bot!'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ name: 'Bro', iconURL: '' })
            .setDescription('This code comes from a <GitHub> project <[AvishakeAdhikary/All-in-One-Discord-JavaScript-BOT](https://github.com/AvishakeAdhikary/All-in-One-Discord-JavaScript-BOT)>.')
            .setTimestamp()
            .setFooter({ text: 'Music comes first - Made with love by <@327028587494637569> <❤️>', iconURL: interaction.member.avatarURL({ dynamic: true }) });

        interaction.editReply({ embeds: [embed] });
	},
};
