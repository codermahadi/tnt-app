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
exports.getMessagesByUserId = exports.getMessages = exports.saveMessage = void 0;
const message_1 = __importStar(require("../models/message"));
// Controller to save a new message
const saveMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        message_1.MessageSchemaZod.parse(req.body);
        const newMessage = new message_1.default(req.body);
        yield newMessage.save();
        res.status(201).json(newMessage);
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving message', error });
    }
});
exports.saveMessage = saveMessage;
// Controller to get all messages
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_1.default.find();
        // Validate the response using Zod
        const validatedMessages = message_1.MessageSchemaZod.array().parse(messages);
        res.status(200).json(validatedMessages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
});
exports.getMessages = getMessages;
// Controller to get messages for a specific user
const getMessagesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params; // Extract userId from the request parameters
    try {
        const messages = yield message_1.default.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        });
        // Validate the response using Zod
        const validatedMessages = message_1.MessageSchemaZod.array().parse(messages);
        res.status(200).json(validatedMessages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
});
exports.getMessagesByUserId = getMessagesByUserId;
