
const db = require('../db/index');

// Parse parameter
exports.parsingParameters = (req, res, next, id) => {
    try {
        req.params.id = id;
        next();
    } catch (err) {
        res.status(500).send(err)
    }
};

// POST: Create a envelope
exports.createEnvelopes = async (req, res) => {
    const { title, budget } = req.body;

    try {
        const envelopes = await db.query('INSERT INTO envelopes (title, budget) VALUES ($1, $2) RETURNING *', [title, budget]);

        res.status(200).send({
            status: 'Success',
            message: 'Envelope created.',
            data: envelopes.rows
        });
    } catch (err) {
        res.status(500).send(err);
    }    
}

// GET: Get all envelopes
exports.getAllEnvelopes = async (req, res) => {
    try {
        const envelopes = await db.query('SELECT * FROM envelopes');

        if (envelopes.rowCount === 0) {
            return res.status(404).send({ message: 'Envelopes not found.' });
        } 
     
        res.status(200).send({
            status: 'Success',
            message: 'Transaction information retrieved.',
            data: envelopes.rows
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

// GET: Get specific envelope by id
exports.getSpecificEnvelope = async (req, res) => {
    try {
        const envelopes = await db.query('SELECT * FROM envelopes WHERE id = $1', [req.params.id]);

        if (envelopes.rowCount === 0) {
            return res.status(404).send({ message: 'Envelope not found.' });
        } 
        
        res.status(200).send({
            status: 'Success',
            message: 'Envelope retrieved.',
            data: envelopes.rows
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

// PUT: Update specific envelope by id
exports.updateSpecificEnvelope = async (req, res) => {
    const id = req.params.id;
    const { title, budget } = req.body;

    try {
        const envelopes = await db.query('UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *;', [title, budget, id]);

        if (envelopes.rowCount === 0) {
            return res.status(404).send({ message: 'Envelope not found.' });
        } 
        
        res.status(201).send({
            status: 'Success',
            message: 'Envelope updated.',
            data: envelopes.rows
        });
        
    } catch (err) {
        res.status(500).send(err);
    }
}

// DELETE: Delete a specific envelope by id
exports.deleteSpecificEnvelope = async (req, res) => {
    const id = req.params.id;

    try {
        const envelopes = await db.query('DELETE FROM envelopes WHERE id = $1 RETURNING *', [id]);

        if (envelopes.rowCount === 0) {
            return res.status(404).send({ message: 'Envelope not found.' });
        }
        res.status(204).send(); 
    } catch (err) {
        res.status(500).send(err);
    }
}

// POST: Create a new envelope transaction
exports.newEnvelopeTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, value } = req.body;
        const date = new Date();

        // Check that the envelopes exist and that the envelope is equal to or greater than the value of the transaction
        const checkEnvelope = await db.query('SELECT EXISTS (SELECT budget >= $1 FROM envelopes WHERE id = $2)', [value, id]);
       
        if (checkEnvelope.rows[0].exists === false) {
            return res.status(404).send({ message: 'Envelope not found or value greater than the envelope.' });
        }

        // Transaction
        const envelopes = await db.query('UPDATE envelopes SET budget = budget - $1 WHERE id = $2', [value, id]);
        const transaction = await db.query('INSERT INTO transactions (title, value, date, envelope_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, value, date, id]);

        res.status(200).send({
            status: 'Success',
            message: 'Transaction successfully completed.',
            data: transaction.rows
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getEnvelopeTransaction = async (req, res) => {
    try {
        const id = req.params.id;

        const transaction = await db.query('SELECT * FROM transactions WHERE envelope_id = $1', [id]);

        if (transaction.rowCount === 0) {
            return res.status(404).send({ message: 'Transaction not found.' });
        }

        res.status(200).send({
            status: 'Success',
            message: 'Envelope transaction retrieved.',
            data: transaction.rows
        });
    } catch (error) {
        res.status(500).send(error);
    }
}
