import { Request, Response } from 'express'; // Import Request and Response types
import User from '../models/User'; // Adjust the path as necessary to where your User model is defined
import bcrypt from 'bcryptjs';

export async function createUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({
            isSuccess: true,
            message: 'User created successfully'
        });
    } catch (error) {
        if (res.headersSent) {
            console.error('Headers were already sent:', error);
        } else {
            console.error('Error during user creation:', error);
            res.status(500).send('Failed to create user');
        }
    }
}
