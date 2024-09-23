const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Fetch all users as potential matches
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users); // Send the list of users as response
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
