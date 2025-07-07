const { body, validationResult } = require('express-validator');

const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

const { body, validationResult } = require('express-validator'); // ← Make sure this is at the top

router.post('/',
  [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('phone')
      .matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
    body('email')
      .isEmail().withMessage('Enter a valid email'),
    body('ideas')
      .optional().isLength({ max: 500 }).withMessage('Ideas must be 500 characters or fewer')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newLead = new Lead(req.body);
      const savedLead = await newLead.save();
      res.status(201).json(savedLead);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);


router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id',
  [
    body('name')
      .optional()
      .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('phone')
      .optional()
      .matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
    body('email')
      .optional()
      .isEmail().withMessage('Enter a valid email'),
    body('ideas')
      .optional()
      .isLength({ max: 500 }).withMessage('Ideas must be 500 characters or fewer')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedLead) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      res.json(updatedLead);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);


router.delete('/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

