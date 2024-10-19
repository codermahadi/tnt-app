"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../../controllers/messageController");
const router = express_1.default.Router();
// New route for messages
router.post('/', messageController_1.saveMessage);
// New route for getting all messages
router.get('/', messageController_1.getMessages);
router.get('/:userId', messageController_1.getMessagesByUserId);
// Export the router
exports.default = router;
