const express = require('express');
const { getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); // Auth middleware to validate token
const router = express.Router();

router.get('/:id', authMiddleware, getProfile); // Route to get user profile by ID

module.exports = router;
