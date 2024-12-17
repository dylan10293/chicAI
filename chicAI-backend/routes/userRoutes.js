const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route to get user data by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return user data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update user data
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email },
      { new: true, runValidators: true } // Return updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return updated user data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
