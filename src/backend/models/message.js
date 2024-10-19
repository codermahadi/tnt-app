"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchemaZod = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
// Define the Zod schema for validation
const MessageSchemaZod = zod_1.z.object({
    text: zod_1.z.string().min(1, "Text is required"),
    sender: zod_1.z.string().min(1, "Sender is required"),
    senderId: zod_1.z.string().min(1, "Sender is required"),
    receiver: zod_1.z.string().min(1, "Receiver is required"),
    receiverId: zod_1.z.string().min(1, "Receiver is required"),
    timestamp: zod_1.z.string().min(1, "Timestamp is required"),
    userImage: zod_1.z.string().url("Invalid URL for user image"),
    attachment: zod_1.z.string().nullable().optional(),
});
exports.MessageSchemaZod = MessageSchemaZod;
// Create the Message schema
const MessageSchema = new mongoose_1.Schema({
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
const Message = mongoose_1.default.model('messages', MessageSchema);
exports.default = Message;
