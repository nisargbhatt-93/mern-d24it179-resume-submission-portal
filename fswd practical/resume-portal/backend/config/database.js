// backend/config/database.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/resume-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;