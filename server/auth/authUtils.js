import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config({path: '../../.env' })

export const getDiscordAuthUrl = () => {
    const redirectUri = 'http://localhost:3001/auth/discord/callback';
    const clientId = process.env.DISCORD_BOT_CLIENT_ID;
    const scope = 'identify email guilds';
    return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
};

export const exchangeCodeForToken = async (code) => {
    const clientId = process.env.DISCORD_BOT_CLIENT_ID;
    const clientSecret = process.env.DISCORD_BOT_CLIENT_SECRET;
    const redirectUri = 'http://localhost:3001/auth/discord/callback';

    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            scope: 'identify email guilds',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error exchanging code for token: ' + error.message);
    }
};

export const getUserInfo = async (accessToken) => {
    try {
        const response = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user info: ' + error.message);
    }
};

export const getUserGuildsInfo = async (accessToken) => {
    try {
        const response = await axios.get('https://discord.com/api/v10/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user info: ' + error.message);
    }
};
