import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import discord from 'discord.js';

dotenv.config();

const app = express();
const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.MessageContent, discord.GatewayIntentBits.GuildPresences] });

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || null;

app.listen(SERVER_PORT, () => {
    console.log(`Listenting to port ${SERVER_PORT}`);
    console.log("Attempting to connect to database.");
    if(!process.env.MONGO_DB_URI)
    {
        console.log('MONGO_DB_URI required inside .env file to run the application.');
    }
    else{
        try{
            mongoose.connect(process.env.MONGO_DB_URI).then(() => {
                console.log("Connected to database successfully.");
            });
        } catch(error) {
            console.log(`Error occured while attempting to connect to ${process.env.MONGO_DB_URI}.`)
        }
        try{
            client.once(discord.Events.ClientReady, readyClient => {
                console.log(`Ready! Logged in as ${readyClient.user.tag}`);
            });
            client.login(DISCORD_BOT_TOKEN);
        } catch(error) {
            console.log(`Error occured while trying to create bot with token ${process.env.DISCORD_BOT_TOKEN}.`)
        }
    }
});