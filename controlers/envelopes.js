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
    try {
        const { title, budget } = req.body;

        const queryEnvelopes = 'INSERT INTO envelopes (title, budget) VALUES ($1, $2) RETURNING *';

        const envelopes = await db.query(queryEnvelopes, [title, budget]);

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
        const queryGetEnvelopes = 'SELECT * FROM envelopes';
        const envelope = [];

        const envelopes = await db.query(queryGetEnvelopes);

        if (envelopes.rowCount === 0) {
            return res.status(404).send({ message: 'Envelopes not found.' });
        } 

        console.log('oi')

        res.status(200).send({
            status: 'Success',
            message: 'Envolopes retrieved.',
            data: envelopes.rows
        });

        for (let i = 0; i != envelopes.rows.length; i++) {
            envelope.push(envelopes.rows[i]);
        }

        const envelopesJSON = JSON.stringify(envelope);

    } catch (err) {
        res.status(500).send(err);
    }
}

// GET: Get specific envelope by id
exports.getSpecificEnvelope = async (req, res) => {
    try {
        const id = req.params.id;

        const queryGetEnvelope = 'SELECT * FROM envelopes WHERE id = $1';

        const envelopes = await db.query(queryGetEnvelope, [id]);

        if (envelopes.rowCount === 0) {
            return res.status(404).send({ message: 'Envelope not found.' });
        }
        
        // res.render('home', { envelopes });
        
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
    try {
        const id = req.params.id;
        const { title, budget } = req.body;

        const queryUpdateEnvelope = 'UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *';

        const envelopes = await db.query(queryUpdateEnvelope, [title, budget, id]);

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
    try {
        const id = req.params.id;
        const queryDeleteEnvelope = 'DELETE FROM envelopes WHERE id = $1 RETURNING *';

        const envelopes = await db.query(queryDeleteEnvelope, [id]);

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

        const queryCheckEnvelope = 'SELECT budget >= $1 FROM envelopes WHERE id = $2 AND budget >= $1';
        const queryUpdateEnvelope = 'UPDATE envelopes SET budget = budget - $1 WHERE id = $2';
        const queryInsertTransaction = 'INSERT INTO transactions (title, value, date, envelope_id) VALUES ($1, $2, $3, $4) RETURNING *';

        // TRANSACTION
        await db.query('BEGIN');

        const checkEnvelope = await db.query(queryCheckEnvelope, [value, id]);
       
        if (checkEnvelope.rowCount === 0) {
            return res.status(404).send({ message: 'Envelope not found or value greater than the envelope.' });
        }

        await db.query(queryUpdateEnvelope, [value, id]);
        const transaction = await db.query(queryInsertTransaction, [title, value, date, id]);
        
        await db.query('COMMIT');

        res.status(200).send({
            status: 'Success',
            message: 'Transaction successfully completed.',
            data: transaction.rows
        });
    } catch (error) {
        await db.query('ROLLBACK')
        res.status(500).send(error);
    }
}

exports.getEnvelopeTransaction = async (req, res) => {
    try {
        const id = req.params.id;

        const queryGetTransaction = 'SELECT * FROM transactions WHERE envelope_id = $1';

        const transaction = await db.query(queryGetTransaction, [id]);

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
