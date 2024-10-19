import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Define the Message interface
export interface IMessage extends Document {
    text: string;
    sender: string;
    senderId: string;
    receiver: string;
    receiverId: string;
    timestamp: string;
    userImage: string; // URL to the user's image
    isOnline: boolean; // Online status of the user
    attachment?: string | null;
}

// Define the Zod schema for validation
const MessageSchemaZod = z.object({
    text: z.string().min(1, "Text is required"),
    sender: z.string().min(1, "Sender is required"),
    senderId: z.string().min(1, "Sender is required"),
    receiver: z.string().min(1, "Receiver is required"),
    receiverId: z.string().min(1, "Receiver is required"),
    timestamp: z.string().min(1, "Timestamp is required"),
    userImage: z.string().url("Invalid URL for user image"),
    attachment: z.string().nullable().optional(),
});

// Export the Zod schema for use in validation
export { MessageSchemaZod };

// Create the Message schema
const MessageSchema: Schema = new Schema({
    text: { type: String, required: true },
    sender: { type: String, required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    receiver: { type: String, required: true },
    timestamp: { type: String, required: true },
    userImage: { type: String, required: true },
    attachment: { type: String, default: null },
});

// Create the Message model
const Message = mongoose.model<IMessage>('messages', MessageSchema);

export default Message;
