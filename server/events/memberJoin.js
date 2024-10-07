import { Events, AttachmentBuilder } from 'discord.js';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import dotenv from 'dotenv';
import WelcomeSettings from '../database/models/welcomeSettings.js';

dotenv.config();

const BOT_COLOR_LIGHT = process.env.DISCORD_BOT_COLOR_LIGHT || '#FFFFFF';
const BOT_COLOR_EXTRA_2 = process.env.DISCORD_BOT_COLOR_EXTRA_2 || '#FF0000';

export default {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const welcomeSetting = await WelcomeSettings.findOne({ guildId: member.guild.id });
        if (!welcomeSetting) {
            console.log(`No welcome channel set for guild: ${member.guild.name}`);
            return;
        }

        const channel = member.guild.channels.cache.get(welcomeSetting.channelId);
        if (!channel) {
            console.error(`Channel with ID ${welcomeSetting.channelId} not found in guild: ${member.guild.name}`);
            return;
        }

        const message = `Welcome to ${member.guild.name}`;

        let backgroundImage;
        try {
            backgroundImage = await loadImage("./server/static/himym-umbrella.jpg");
        } catch (error) {
            console.error('Error loading background image:', error);
            return;
        }

        const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(backgroundImage, 0, 0);

        // Load user's profile image
        const userAvatarUrl = member.displayAvatarURL({ format: 'png', size: 512 });
        let userProfileImage;

        try {
            userProfileImage = await loadImage(userAvatarUrl);
            ctx.save();
            ctx.beginPath();
            ctx.arc(725 + 75, 100 + 75, 75, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(userProfileImage, 725, 100, 150, 150);
            ctx.restore();
        } catch (error) {
            console.error('Error loading user profile image:', error);
            await channel.send(`Welcome, ${member}! SUIT UP!!! Unfortunately, I couldn't load your profile image.`);
            return;
        }

        ctx.font = '50px Inter';
        ctx.fillStyle = BOT_COLOR_LIGHT;
        ctx.textAlign = 'center';
        ctx.fillText(message, canvas.width / 2, 400);
        ctx.fillStyle = BOT_COLOR_EXTRA_2;
        ctx.fillText(`@${member.displayName || member.user.username}`, canvas.width / 2, 500);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'welcome.png' });
        await channel.send({ 
            content: `Welcome, ${member}! SUIT UP!!!`, 
            files: [attachment],
            embeds: [
                {
                    title: "SUIT UP!!!",
                    description: "It's going to be legen-wait-for-it-dary! Legendary!!!",
                    url: "https://avishakeadhikary.github.io/",
                    color: parseInt("#000000".replace('#', ''), 16),
                    author: {
                        name: "Bro",
                        icon_url: "https://cdn.discordapp.com/avatars/1276859825833115669/c4af006d1350f6ccd26836aab0867af0",
                        url: "https://avishakeadhikary.github.io/"
                    },
                    image: {
                        url: "https://raw.githubusercontent.com/AvishakeAdhikary/All-in-One-Discord-JavaScript-BOT/refs/heads/main/server/static/barney.gif"
                    },
                    thumbnail: {
                        url: "https://media.tenor.com/CNJnkNyje94AAAAi/welcome.gif"
                    }
                }
            ]
        });
    },
};
