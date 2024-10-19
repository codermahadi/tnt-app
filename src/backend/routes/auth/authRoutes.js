"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const userController_1 = require("../../controllers/userController");
const authController_1 = require("../../controllers/authController");
const jwtHelper_1 = require("../../utils/jwtHelper");
const router = (0, express_1.Router)();
// Zod schemas for validation
const registrationSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
// Define a POST route for user registration
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        registrationSchema.parse(req.body);
        yield (0, userController_1.createUser)(req, res);
        // Save user logic here
        //const token = generateToken('newUserId'); // Assume new user ID is returned from database
        // res.json({ message: 'User registered', token });
    }
    catch (error) {
        if (error instanceof Error && 'errors' in error) {
            res.status(400).json({ message: 'Invalid input', error: error.errors });
        }
        else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}));
// Define a POST route for user login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        loginSchema.parse(req.body);
        yield (0, authController_1.loginUser)(req, res);
    }
    catch (error) {
        if (error instanceof Error && 'errors' in error) {
            res.status(400).json({ message: 'Invalid input', error: error.errors });
        }
        else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}));
// Define a POST route for refreshing the token
router.post('/refresh-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body; // Get refresh token from request body
    if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token is required' });
    }
    try {
        // Verify the refresh token        
        res.json((0, jwtHelper_1.verifyRefreshToken)(refreshToken));
    }
    catch (_a) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
}));
// Define a POST route for password reset
router.post('/reset', (req, res) => {
    res.send('Password reset');
});
exports.default = router;
