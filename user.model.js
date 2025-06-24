const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'first name must be at least 3 characters']
    },
    lastname: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || v.length >= 3;
        },
        message: 'last name must be at least 3 characters'
      },
      default: ''
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'email must be at least 5 characters']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this.id }, process.env.JWT_SECRET);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
