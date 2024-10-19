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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jwtHelper_1 = require("../utils/jwtHelper");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Fetch user from MongoDB
        const user = yield User_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            const token = (0, jwtHelper_1.generateToken)(user._id.toString()); // Generate access token
            const refreshToken = (0, jwtHelper_1.generateRefreshToken)(user._id.toString()); // Generate refresh token
            res.json({
                message: 'Logged in successfully',
                user: {
                    id: user._id.toString(),
                    email: user.email,
                },
                token,
                refreshToken // Include refresh token in the response
            });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        if (error instanceof Error && 'errors' in error) {
            res.status(400).json({ message: 'Invalid input', error: error.errors });
        }
        else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});
exports.loginUser = loginUser;
