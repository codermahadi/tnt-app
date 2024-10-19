import { Router } from 'express';

const router = Router();

// Define a GET route
router.get('/users', (req, res) => {
    res.send('List of users');
});

// Define a POST route
router.post('/users', (req, res) => {
    res.send('User added');
});

export default router;
