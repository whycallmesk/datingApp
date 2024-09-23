const User = require('../models/User');

exports.searchUsers = async (req, res) => {
  const query = req.query.q;
  try {
    const users = await User.find({ name: { $regex: query, $options: 'i' } });
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error searching users', error });
  }
};
