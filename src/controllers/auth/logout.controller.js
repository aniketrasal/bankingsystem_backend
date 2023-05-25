const User = require('../../models/user.model');

const logoutController = async (req, res) => {
  try {
    req.user.accessToken = '';
    await req.user.save();

    res.send('Logged out successfully.');
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = logoutController;
