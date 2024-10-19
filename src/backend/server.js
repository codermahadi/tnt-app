"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import user routes
const authRoutes_1 = __importDefault(require("./routes/auth/authRoutes")); // Import auth routes
const authMiddleware_1 = require("./middleware/authMiddleware");
require("./config/database");
const messageRoutes_1 = __importDefault(require("./routes/message/messageRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5010;
// Configure CORS with options to include multiple origins
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://192.168.1.5:3000'],
    methods: ['GET', 'POST'], // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
    credentials: true // Enable credentials
}));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Use routes
app.use('/api/users', authMiddleware_1.authenticate, userRoutes_1.default); // Mount user routes at /api/users
app.use('/api/message', authMiddleware_1.authenticate, messageRoutes_1.default); // Mount message routes at /api/message
app.use('/api/auth', authRoutes_1.default); // Mount auth routes at /api/auth
// Middleware for handling 404 errors
app.use((req, res, next) => {
    console.log(next);
    res.status(404).send("Sorry can't find that!");
});
// Middleware for handling errors
app.use((err, req, res, next) => {
    console.log(next);
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
