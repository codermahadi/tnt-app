import { Router } from 'express';
import { z } from 'zod';

import { createUser } from '../../controllers/userController';
import { loginUser } from '../../controllers/authController';
import { verifyRefreshToken } from '../../utils/jwtHelper';

const router = Router();


// Zod schemas for validation
const registrationSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// Define a POST route for user registration
router.post('/register', async (req, res) => {
    try {
        registrationSchema.parse(req.body);
        await createUser(req,res)
        // Save user logic here
        //const token = generateToken('newUserId'); // Assume new user ID is returned from database
       // res.json({ message: 'User registered', token });
    } catch (error) {
        if (error instanceof Error && 'errors' in error) {
            res.status(400).json({ message: 'Invalid input', error: error.errors });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});

// Define a POST route for user login
router.post('/login', async (req, res) => {
    try {
        loginSchema.parse(req.body);
        await loginUser(req, res)
    } catch (error) {
        if (error instanceof Error && 'errors' in error) {
            res.status(400).json({ message: 'Invalid input', error: error.errors });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});

// Define a POST route for refreshing the token
router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body; // Get refresh token from request body

    if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        // Verify the refresh token        
        res.json(verifyRefreshToken(refreshToken));
    } catch {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
});

// Define a POST route for password reset
router.post('/reset', (req, res) => {
    res.send('Password reset');
});



export default router;
