"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwtHelper_1 = require("../utils/jwtHelper");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Bearer Token
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const decoded = (0, jwtHelper_1.verifyToken)(token);
    console.log(token, decoded);
    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
        req.user = decoded; // Cast decoded to User type after checking necessary properties
        next();
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.authenticate = authenticate;
