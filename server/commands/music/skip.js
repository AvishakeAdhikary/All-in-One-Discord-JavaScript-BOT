import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the currently playing song.'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild);
        if(!queue?.isPlaying())
        {
            return interaction.reply({ content: `No music currently playing ${interaction.member}`})
        }

        const success = queue.node.skip();

        const embedding = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(success ? `Current music \`${queue.currentTrack.title}\` skipped by ${interaction.member}` : `Something went wrong, ${interaction.member}`);
        
        return interaction.reply({ embeds: [embedding] });
    },
};
