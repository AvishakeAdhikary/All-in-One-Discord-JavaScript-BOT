import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import client from './bot.js';
import apiRoutes from './api/index.js';
import authRoutes from './auth/authRoutes.js';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'barneystinson',
    resave: false,
    saveUninitialized: false,
}));

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || null;

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
        .catch(error => console.error('Error occurred while trying to create bot with token.', error));
});