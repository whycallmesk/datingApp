const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure authentication middleware
const router = express.Router();

// Search users by name
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.query; // Get the search query from request query params
    const users = await User.find({ name: new RegExp(name, 'i') }); // Search by name using regex, case insensitive
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(users); // Send found users as JSON response
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
