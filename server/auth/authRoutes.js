import express from 'express';
import { getDiscordAuthUrl, exchangeCodeForToken, getUserInfo, getUserGuildsInfo } from './authUtils.js';
import dotenv from 'dotenv'

dotenv.config({path: '../../.env' })

const router = express.Router();

router.get('/discord', (req, res) => {
    const authUrl = getDiscordAuthUrl();
    res.redirect(authUrl);
});

router.get('/discord/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const { access_token } = await exchangeCodeForToken(code);
        const user = await getUserInfo(access_token);
        const guilds = await getUserGuildsInfo(access_token);
        req.session.user = user;
        req.session.guilds = guilds;
        console.log("Logged in as user:", req.session.user);
        console.log("User guilds:", req.session.guilds);
        res.redirect('http://localhost:3000/servers');
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Authentication error');
    }
});

router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(req.session.user);
});

router.get('/servers', (req, res) => {
    if (!req.session.user) {
        return res.redirect('http://localhost:3000/login');
    }

    const ADMINISTRATOR_PERMISSION = 8;
    const adminGuilds = req.session.guilds.filter(guild => {
        const permissions = BigInt(guild.permissions);
        return (permissions & BigInt(ADMINISTRATOR_PERMISSION)) !== BigInt(0);
    });
    res.json(adminGuilds);
});

export default router;
