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

router.post('/textchannels', (req, res) => {
    const { serverId } = req.body;

    if (!serverId) {
        return res.status(400).json({ error: 'Server ID is required' });
    }

    const server = client.guilds.cache.get(serverId);
    if (!server) {
        return res.status(404).json({ error: 'Server not found.' });
    }

    const textChannels = server.channels.cache
        .filter(channel => channel.isText())
        .map(channel => ({
            id: channel.id,
            name: channel.name,
            topic: channel.topic || null,
        }));

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

export default router;