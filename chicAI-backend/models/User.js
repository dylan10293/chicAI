const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // Store the filename of the profile picture
    default: '',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
