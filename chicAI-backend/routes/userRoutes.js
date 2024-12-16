const express = require('express');
const multer = require('multer');
const path = require('path');
const { updateUserProfile } = require('../controllers/userController');

const router = express.Router();

// Set up Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to update user profile
router.post('/update', upload.single('profilePicture'), updateUserProfile);

module.exports = router;
