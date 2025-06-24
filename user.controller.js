const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, fullname, password } = req.body;
  const firstname = fullname?.firstname;
  const lastname = fullname?.lastname;

  if (!email || !firstname || !lastname || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    email,
    fullname: { firstname, lastname }, // ✅ Include both first and last name
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = user.generateAuthToken();
  
  res.status(200).json({ token, user });
}
