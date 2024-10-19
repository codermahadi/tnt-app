"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = 'mongodb://localhost:27017/tnt-chat'; // Replace with your MongoDB URL
mongoose_1.default.connect(url, {
    serverSelectionTimeoutMS: 20000, // Increase timeout
    socketTimeoutMS: 45000 // Increase socket timeout
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
// Add more event listeners to handle connection state
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});
exports.default = mongoose_1.default;
