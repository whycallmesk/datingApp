const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
