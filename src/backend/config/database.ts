import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/tnt-chat'; // Replace with your MongoDB URL

mongoose.connect(url, {
    serverSelectionTimeoutMS: 20000, // Increase timeout
    socketTimeoutMS: 45000 // Increase socket timeout
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Add more event listeners to handle connection state
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

export default mongoose;
