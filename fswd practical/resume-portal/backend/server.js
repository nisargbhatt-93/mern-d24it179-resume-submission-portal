// backend/server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('./config/cloudinary');
const axios = require('axios');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/resume-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// API Endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a new resume submission
app.post('/api/resumes', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const resume = req.file;

    // Upload resume to Cloudinary
    const uploadedResume = await cloudinary.uploader.upload(resume.path, {
      resource_type: 'raw',
      folder: 'resumes',
    });

    // Create a new resume submission in MongoDB
    const Resume = mongoose.model('Resume', {
      name: String,
      email: String,
      phone: String,
      resume: String,
    });
    const newResume = new Resume({
      name,
      email,
      phone,
      resume: uploadedResume.secure_url,
    });
    await newResume.save();

    res.json({ message: 'Resume submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting resume' });
  }
});

// Get all resume submissions
app.get('/api/resumes', async (req, res) => {
  try {
    const Resume = mongoose.model('Resume', {
      name: String,
      email: String,
      phone: String,
      resume: String,
    });
    const resumes = await Resume.find().exec();
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching resumes' });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});