import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken, generateRefreshToken } from '../utils/jwtHelper';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // Fetch user from MongoDB
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id.toString()); // Generate access token
            const refreshToken = generateRefreshToken(user._id.toString()); // Generate refresh token
            res.json({ 
                message: 'Logged in successfully', 
                user: { 
                    id: user._id.toString(), 
                    email: user.email, 
                }, 
                token, 
                refreshToken // Include refresh token in the response
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        if (error instanceof Error && 'errors' in error) {
            res.status(400).json({ message: 'Invalid input', error: error.errors });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
};
