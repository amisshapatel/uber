const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to DB');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

module.exports = connectToDB;

