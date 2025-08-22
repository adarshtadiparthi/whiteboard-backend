const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectDb() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('MONGO_URI not set in environment variables');
        process.exit(1);
    }
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDb;