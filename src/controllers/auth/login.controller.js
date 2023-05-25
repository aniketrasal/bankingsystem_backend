const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('Invalid login credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign({ _id: user._id.toString() }, 'your-secret-key');
    user.accessToken = token;
    await user.save();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = loginController;
