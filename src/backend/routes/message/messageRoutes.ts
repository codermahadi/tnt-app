import express from 'express';
import { saveMessage, getMessages, getMessagesByUserId } from '../../controllers/messageController';
const router = express.Router();

// New route for messages
router.post('/', saveMessage);

// New route for getting all messages
router.get('/', getMessages);

router.get('/:userId', getMessagesByUserId);


// Export the router
export default router;
