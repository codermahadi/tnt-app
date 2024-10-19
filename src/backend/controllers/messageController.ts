import { Request, Response } from 'express';
import MessageModel, { IMessage, MessageSchemaZod } from '../models/message';
        
// Controller to save a new message
export const saveMessage = async (req: Request, res: Response) => {
    try {
        MessageSchemaZod.parse(req.body)
        const newMessage: IMessage = new MessageModel(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error saving message', error });
    }
};

// Controller to get all messages
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages: IMessage[] = await MessageModel.find();
        
        // Validate the response using Zod
        const validatedMessages = MessageSchemaZod.array().parse(messages);
        
        res.status(200).json(validatedMessages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
};

// Controller to get messages for a specific user
export const getMessagesByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params; // Extract userId from the request parameters
    try {
        const messages: IMessage[] = await MessageModel.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        });
        
        // Validate the response using Zod
        const validatedMessages = MessageSchemaZod.array().parse(messages);
        
        res.status(200).json(validatedMessages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
};
