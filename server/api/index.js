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

router.get('/haspermissions', (req, res) => {
    const { userId, serverId } = req.body;
    if (!userId || !serverId) {
        return res.status(400).json({ error: 'User ID and Server ID are required' });
    }
    const server = client.guilds.cache.get(serverId);
    if(!server)
    {
        return res.status(404).json({ error: 'Server not found.' });
    }
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