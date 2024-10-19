"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'your_secret_key'; // Use an environment variable in production
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (_) {
        console.log(_);
        return null;
    }
};
exports.verifyToken = verifyToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, secretKey, { expiresIn: '7d' }); // Longer expiration for refresh token
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey); // Specify the type of decoded
        const newToken = jsonwebtoken_1.default.sign({ id: decoded.id }, secretKey, { expiresIn: '1h' }); // Generate a new token
        return { token: newToken, refreshToken: token }; // Return both new token and refresh token
    }
    catch (_) {
        console.log(_);
        return null; // Return null if verification fails
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
