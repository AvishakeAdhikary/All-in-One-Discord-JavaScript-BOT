import mongoose from 'mongoose';

const birthdaySettingsSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    channelId: { type: String, required: true },
}, {
    collection: 'birthdaySettings'
});

const BirthdaySettings = mongoose.model('BirthdaySettings', birthdaySettingsSchema);
export default BirthdaySettings;
