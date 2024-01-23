// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRECT = "ewf98we789ew7v897vdcsc()EF*E(^FE"


const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const isFirstUser = (await User.countDocuments({})) === 0;
    const role = isFirstUser ? 'admin' : 'user';

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'fail' });
    }


    

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: hashedPassword,
      role
    });

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email , role:user.role},
      JWT_SECRECT,
      { expiresIn: '12h' }
    );

    // console.log(user);

    await user.save();

    res.status(201).json({ token, role: user.role,username: user.username, email: user.email,
      message: 'ok', });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'fail' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'fail' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email ,role:user.role},
      JWT_SECRECT,
      { expiresIn: '12h' }
    );

    res.status(200).json({
      token, role: user.role,username: user.username, email: user.email,
      message: 'ok',
    });
  } catch (error) {
    res.status(500).json({ message: 'fail' });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email , role:user.role},
      JWT_SECRECT,
      { expiresIn: '24h' }
    );
    res.status(200).json({ user,token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, getOneUser };
