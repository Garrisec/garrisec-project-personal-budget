var express = require('express');
var router = express.Router();

const {
  parsingParameters,
  createEnvelopes,
  getAllEnvelopes,
  getSpecificEnvelope,
  updateSpecificEnvelope,
  deleteSpecificEnvelope,
  transferValueEnvelope
} = require('../controlers/envelopes.js');

// Parse parameters
router.param('envelope', parsingParameters);

// Create envelopes
router.post('/', createEnvelopes);

// GET all envelopes
router.get('/', getAllEnvelopes);

// GET specific envelope
router.get('/:envelope', getSpecificEnvelope);

// Update a specific envelope
router.put('/:envelope', updateSpecificEnvelope);

// Delete specific envelope
router.delete('/:envelope', deleteSpecificEnvelope);

// Transfers a value from one envelope to another 
router.post('/transfer/:from/:to', transferValueEnvelope);


module.exports = router;
