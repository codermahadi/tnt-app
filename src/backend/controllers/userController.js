"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const User_1 = __importDefault(require("../models/User")); // Adjust the path as necessary to where your User model is defined
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        try {
            const newUser = new User_1.default({ username, email, password: hashedPassword });
            yield newUser.save();
            res.status(201).send({
                isSuccess: true,
                message: 'User created successfully'
            });
        }
        catch (error) {
            if (res.headersSent) {
                console.error('Headers were already sent:', error);
            }
            else {
                console.error('Error during user creation:', error);
                res.status(500).send('Failed to create user');
            }
        }
    });
}
