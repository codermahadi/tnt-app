import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes'; // Import user routes
import authRoutes from './routes/auth/authRoutes'; // Import auth routes
import { authenticate } from './middleware/authMiddleware';
import "./config/database"
import messageRoutes from './routes/message/messageRoutes';
const app = express();
const PORT = process.env.PORT || 5010;

// Configure CORS with options to include multiple origins
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.1.5:3000'],
    methods: ['GET', 'POST'], // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
    credentials: true // Enable credentials
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api/users', authenticate, userRoutes); // Mount user routes at /api/users
app.use('/api/message', authenticate, messageRoutes); // Mount message routes at /api/message
app.use('/api/auth', authRoutes); // Mount auth routes at /api/auth

// Middleware for handling 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(next)
    res.status(404).send("Sorry can't find that!");
});

// Middleware for handling errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(next)
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
