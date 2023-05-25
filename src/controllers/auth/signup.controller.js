const bcrypt = require('bcryptjs');
const User = require('../../models/user.model');

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();

    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = signupController;
