import mongoose from 'mongoose';

const birthdaySchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number }
}, {
    collection: 'birthdays'
});

const Birthday = mongoose.model('Birthday', birthdaySchema);
export default Birthday;
