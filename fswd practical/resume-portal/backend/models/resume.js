// backend/models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  resume: String,
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;