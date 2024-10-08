import { SlashCommandBuilder } from 'discord.js';
import { useMainPlayer } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from YouTube or any other supported source.')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The song title or URL to play')
                .setRequired(true)
                .setAutocomplete(true)),
    async execute(interaction) {
        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;
        if (!channel) {
            return await interaction.reply('You need to be in a voice channel to play music!');
        }
        
        const query = interaction.options.getString('query');
        if (!query) {
            return await interaction.reply('No query is specified.');
        }

        await interaction.deferReply();

        const searchResult = await player.search(query, { requestedBy: interaction.user });
        if (!searchResult.hasTracks()) {
            await interaction.followUp(`We found no tracks for ${query}!`);
            return;
        }

        try {
            await player.play(channel, searchResult, {
                nodeOptions: {
                    metadata: interaction.channel
                }
            });
            await interaction.followUp({ content: `Loading your track(s) - \`${searchResult}.\`` });
        } catch (error) {
            console.error("Error: ", error);
            await interaction.followUp({ content: `Error occurred while loading track: \`${error.message}\`` });
        }
    },
    async autocomplete(interaction) {
        const player = useMainPlayer();
        const query = interaction.options.getString('query', true);
        
        if (!query) return;

        const results = await player.search(query);
        
        return interaction.respond(
            results.tracks.slice(0, 25).map((t) => ({
                name: `${t.title} - ${t.author} [${t.duration}] (${t.source.toUpperCase()})`.slice(0, 100),
                value: t.url
            })).filter(t => t.name.length > 0)
        );
    },
};