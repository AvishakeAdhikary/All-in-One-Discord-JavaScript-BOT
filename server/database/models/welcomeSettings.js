import mongoose from 'mongoose';

const welcomeSettingsSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    channelId: { type: String, required: true },
}, {
    collection: 'welcomeSettings'
});

const WelcomeSettings = mongoose.model('WelcomeSettings', welcomeSettingsSchema);
export default WelcomeSettings;