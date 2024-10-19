"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Define a GET route
router.get('/users', (req, res) => {
    res.send('List of users');
});
// Define a POST route
router.post('/users', (req, res) => {
    res.send('User added');
});
exports.default = router;
