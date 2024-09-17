import { SlashCommandBuilder } from 'discord.js';
import { fileURLToPath } from 'url';
import { Module } from 'module';
import dotenv from 'dotenv'

dotenv.config({path: '../../.env' })

export default {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }
		if(interaction.user.id != process.env.OWNER_ID) {
			return interaction.reply(`${interaction.user.username}, you are not allowed to run this command.`);
		}
        const commandPath = new URL(`../${command.category}/${command.data.name}.js`, import.meta.url);

        try {
            const commandFilePath = fileURLToPath(commandPath);
            delete Module._cache[commandFilePath];
            const { default: newCommand } = await import(commandPath);
            interaction.client.commands.set(newCommand.data.name, newCommand);

            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }
    },
};
