var express = require('express');
var router = express.Router();

const {
  parsingParameters,
  createEnvelopes,
  getAllEnvelopes,
  getSpecificEnvelope,
  updateSpecificEnvelope,
  deleteSpecificEnvelope,
  getEnvelopeTransaction,
  newEnvelopeTransaction
} = require('../controlers/envelopes.js');

// Parse parameters
router.param('id', parsingParameters);

// Create envelopes
router.post('/newenvelope', createEnvelopes);

// GET all envelopes  
router.get('/', getAllEnvelopes);

// GET specific envelope
router.get('/:id', getSpecificEnvelope);

// Update a specific envelope
router.put('/update/:id', updateSpecificEnvelope);

// Delete specific envelope
router.delete('/delete/:id', deleteSpecificEnvelope);

// GET envelope transaction by id
router.get('/:id/transactions', getEnvelopeTransaction);

// POST new transaction
router.post('/:id/transactions', newEnvelopeTransaction);

module.exports = router;
