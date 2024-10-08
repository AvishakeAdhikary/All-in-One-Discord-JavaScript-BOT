import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help for the bot!'),
    showHelp: true,

    async execute(interaction) {
        const { client } = interaction;
        const commands = client.commands.filter(command => command.showHelp !== false);

        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setDescription('This code comes from a `GitHub` project [AvishakeAdhikary/All-in-One-Discord-JavaScript-BOT](https://github.com/AvishakeAdhikary/All-in-One-Discord-JavaScript-BOT).')
            .addFields(
				[
					{
						name: `Enabled - ${commands.size}`, 
						value: commands.map(command => `\`${command.data.name}\``).join(' | ')
					}, 
					{
						name: `Owner`,
						value: `[Avishake Adhikary](https://avishakeadhikary.github.io/)`
					}
				]
			)
            .setTimestamp()
            .setFooter({ text: 'Made with love. ❤️', iconURL: 'https://github.com/AvishakeAdhikary/avishakeadhikary.github.io/blob/main/public/images/gallery/AvishakeAdhikaryDP.jpg?raw=true' });

        interaction.reply({ embeds: [embed] });
    },
};
