const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters'],
    trim: true
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone must be 10 digits']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
    lowercase: true
  },
  ideas: { type: String, maxlength: 500 },
  followUps: [{
    message: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
