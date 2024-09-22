import express from 'express';
import client from '../bot.js';

const router = express.Router();

router.get('/status', (req, res) => {
    if (client.readyAt) {
        res.json({ status: 'online', username: client.user.tag });
    } else {
        res.json({ status: 'offline' });
    }
});

router.post('/haspermissions', async (req, res) => {
    const { userId, serverId } = req.body;

    if (!userId || !serverId) {
        return res.status(400).json({ error: 'User ID and Server ID are required' });
    }

    const server = client.guilds.cache.get(serverId);
    if (!server) {
        return res.status(404).json({ error: 'Server not found.' });
    }

    try {
        const member = await server.members.fetch(userId);
        
        const isAdmin = member.permissions.has('ADMINISTRATOR');

        const isModerator = member.roles.cache.some(role => role.name === 'Moderator');
        
        const hasPermissions = isAdmin || isModerator;

        res.json({ hasPermissions });
    } catch (error) {
        if (error.code === 50001) {
            return res.status(404).json({ error: 'User not found in the server.' });
        }
        console.error('Error fetching member:', error);
        res.status(500).json({ error: 'Failed to check permissions.' });
    }
});

router.post('/textchannels', async (req, res) => {
    const { serverId, userId } = req.body;

    if (!serverId || !userId) {
        return res.status(400).json({ error: 'Server ID and User ID are required' });
    }
    const server = client.guilds.cache.get(serverId);
    if (!server) {
        return res.status(404).json({ error: 'Server not found.' });
    }

    const member = await server.members.fetch(userId)
    if (!member) {
        return res.status(404).json({ error: 'Member not found.' });
    }
    const isAdmin = member.permissions.has('ADMINISTRATOR');
    const isModerator = member.roles.cache.some(role => role.name === 'Moderator');
    const hasPermissions = isAdmin || isModerator;
    
    const textChannels = server.channels.cache.filter((channel) => {
        if(channel.isTextBased() && hasPermissions)
        {
            return [channel.id, channel.name];
        }
    });
    res.json({ textChannels });
});


router.post('/send-message', async (req, res) => {
    const { channelId, message } = req.body;

    if (!channelId || !message) {
        return res.status(400).json({ error: 'Channel ID and message are required' });
    }

    const channel = client.channels.cache.get(channelId);

    if (!channel || !channel.isTextBased()) {
        return res.status(404).json({ error: 'Channel not found or not text-based' });
    }

    try {
        await channel.send(message);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

router.post('/send-embedding', async (req, res) => {
    const { channelId, embed } = req.body;

    if (!channelId || !embed) {
        return res.status(400).json({ error: 'Channel ID and embed data are required' });
    }

    const channel = client.channels.cache.get(channelId);

    if (!channel || !channel.isTextBased()) {
        return res.status(404).json({ error: 'Channel not found or not text-based' });
    }

    try {
        const embedMessage = {
            title: embed.title,
            description: embed.content,
            url: embed.url,
            color: parseInt(embed.color.replace('#', ''), 16),
            author: {
                name: embed.author,
                icon_url: embed.authorIcon,
                url: embed.authorURL
            },
            image: {
                url: embed.image
            },
            thumbnail: {
                url: embed.thumbnail
            },
            timestamp: new Date(embed.date).toISOString(),
            footer: {
                text: embed.footerTitle,
                icon_url: embed.footerIcon
            }
        };

        await channel.send({content: embed.messageContent,  embeds: [embedMessage] });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending embedding:', error);
        res.status(500).json({ error: 'Failed to send embedding' });
    }
});

export default router;