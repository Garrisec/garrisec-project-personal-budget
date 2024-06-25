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

// Get all envelopes  
router.get('/', getAllEnvelopes);

// Get specific envelope
router.get('/:id', getSpecificEnvelope);

// Get envelope transaction by id
router.get('/:id/transactions', getEnvelopeTransaction);

// Update a specific envelope
router.put('/update/:id', updateSpecificEnvelope);

// Delete specific envelope
router.delete('/delete/:id', deleteSpecificEnvelope);

// New transaction
router.post('/:id/transactions', newEnvelopeTransaction);

// Create envelopes
router.post('/newenvelope', createEnvelopes);

module.exports = router;
