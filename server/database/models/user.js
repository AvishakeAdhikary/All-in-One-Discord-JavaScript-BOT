import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    discriminator: String,
});

const User = mongoose.model('User', userSchema);

export default User;
