const userModel = require('../models/user.model');

module.exports.createUser = async ({ email, fullname, password }) => {
  const firstname = fullname?.firstname;

  if (!email || !firstname || !password) {
    throw new Error('All fields are required');
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = new userModel({
    fullname: {
      firstname,
      lastname: ''
    },
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
};
