const User = require('../models/User');

exports.getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('matches', 'name _id');  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.matches);  
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
