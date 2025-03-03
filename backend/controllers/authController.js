const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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


exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request:', req.body);  
  
    try {
      
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found');  
        return res.status(404).json({ message: 'User not found' });
      }
  

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Invalid credentials');  
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      console.log('Login successful');  
      res.json({ token, user });
    } catch (error) {
      console.error('Login error:', error);  
      res.status(400).json({ message: 'Login failed', error });
    }
  };