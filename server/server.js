import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import cron from 'node-cron';
import client, { loadCommands, loadEvents } from './bot.js';
import apiRoutes from './api/index.js';
import authRoutes from './auth/authRoutes.js';
import discord from 'discord.js'
import Birthday from './database/models/birthday.js';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.static('/static'))

app.use(session({
    secret: process.env.SESSION_SECRET || 'barneystinson',
    resave: false,
    saveUninitialized: false,
}));

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || null;
const rest = new discord.REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on server port: ${SERVER_PORT}.`);
    console.log("Attempting to connect to database.");

    if (!process.env.MONGO_DB_URI) {
        console.log('MONGO_DB_URI required inside .env file to run the application.');
    } else {
        mongoose.connect(process.env.MONGO_DB_URI)
            .then(() => console.log("Connected to database successfully."))
            .catch(error => console.error(`Error occurred while attempting to connect to ${process.env.MONGO_DB_URI}.`, error));
    }

    client.login(DISCORD_BOT_TOKEN)
        .then(() => console.log('Bot logged in successfully.'))
        .then(() => {
            loadCommands(rest);
            loadEvents(rest);
        })
        .catch(error => console.error('Error occurred while trying to create bot with token.', error));
    
    cron.schedule('0 0 * * *', async () => {
        console.log('Checking for birthdays...');
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
    
        const guilds = client.guilds.cache;
    
        for (const guild of guilds.values()) {
            const birthdayChannelSetting = await BirthdaySettings.findOne({ guildId: guild.id });
    
            if (!birthdayChannelSetting) continue;
    
            const birthdaysToday = await Birthday.find({ day, month });
    
            const channel = guild.channels.cache.get(birthdayChannelSetting.channelId);
            
            if (channel && channel.isText()) {
                for (const birthdayData of birthdaysToday) {
                    const user = await guild.members.fetch(birthdayData.userId).catch(() => null);
                    if (user) {
                        channel.send(`🎉 Happy Birthday, <@${user.id}>! 🎉`);
                    }
                }
            } else {
                console.warn(`Channel with ID ${birthdayChannelSetting.channelId} not found or is not a text channel.`);
            }
        }
    });
});