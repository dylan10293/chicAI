const User = require('../models/User');
const path = require('path');
const fs = require('fs');

const updateUserProfile = async (req, res) => {
  const { name, age, dob, email, phone } = req.body;
  const profilePicture = req.file ? req.file.filename : null;

  try {
    const user = await User.findOneAndUpdate(
      { email }, // Assuming email is unique for each user
      { name, age, dob, email, phone, profilePicture },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

module.exports = { updateUserProfile };
