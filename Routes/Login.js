const Router = require('express').Router();
const User = require('../Modal/User');
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'saljkf7q3458uhof7034y6ch';

Router.post('/register', async (req, res) => {
  const { password, email } = req.body;
  const users = await User.find({ email: email });
  // console.log(users);
  if (users.length > 0) {
    return res
      .json({
        message: 'User already exists',
      })
      .status(400);
  }

  try {
    const user = await new User({
      password: password,
      email: email,
      token: '',
    });

    const token = await JWT.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '300s',
    });
    user.token = token;
    await user.save();
    return res.json({ userId: user._id, token }).status(200);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// Login

Router.post('/login', async (req, res) => {
  console.log(req.body);
  let token;
  const data = req.body;
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return res.status(200).json({
      message: 'User not found',
    });
  }
  if (user.password !== data.password) {
    return res.status(200).json({
      message: 'Password is incorrect',
    });
  }

  try {
    token = user.token;
    const Verify = await JWT.decode(token, JWT_SECRET);

    // if()
    if (+Verify.exp < Date.now() / 1000) {
      token = JWT.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '300s',
      });
      user.token = token;
      await user.save();
    }
  } catch (error) {}

  return res
    .json({
      token: token,
    })
    .status(200);
});

module.exports = Router;
