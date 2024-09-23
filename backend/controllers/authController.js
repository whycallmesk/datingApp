const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup logic
exports.signup = async (req, res) => {
  const { name, email, password, clubsOrganizations } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
      clubsOrganizations,
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request:', req.body);  // Log the request data for debugging
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found');  // Log error if user is not found
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Invalid credentials');  // Log error if password doesn't match
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If password matches, generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      console.log('Login successful');  // Log successful login
      res.json({ token, user });
    } catch (error) {
      console.error('Login error:', error);  // Log any other errors
      res.status(400).json({ message: 'Login failed', error });
    }
  };