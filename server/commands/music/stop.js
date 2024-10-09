import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and clear the queue.'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild);
        if(!queue?.isPlaying())
        {
            return interaction.reply({ content: `No music currently playing ${interaction.member}`})
        }

        queue.delete();

        const embedding = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(`Stopped by ${interaction.member}`);
        
        return interaction.reply({ embeds: [embedding] });
    },
};
