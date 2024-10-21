import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'; // Import CORS

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5011;

// Serve static files (optional)
app.use(express.static('public'));

// Use CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.1.100:3000'], // Whitelist both localhost and your IP address
    methods: ['GET', 'POST'], // Allow specific methods
    credentials: true // Allow credentials if needed
})); // Enable CORS for all routes

// Store connected users
const users = {};

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Assign a unique identifier to the user (for example, using socket.id)
    users[socket.id] = socket;

    console.log('users', users)
    // Listen for chat messages
    socket.on('chat message', ({ msg, recipientId }) => {
        console.log('Message received: ' + msg);
        // Send the message to a specific user
        if (users[recipientId]) {
            users[recipientId].emit('chat message', msg);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Remove the user from the list
        delete users[socket.id];
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
