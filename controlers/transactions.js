const db = require('../db/index');

exports.parsingParameters = async (req, res, next, id) => {
    try {
        req.params.id = id;
        next();
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getTransactions = async (req, res) => {
    try {
        const queryGetTransactions = 'SELECT * FROM transactions';

        const transactions = await db.query(queryGetTransactions);

        if (transactions.rowsCount === 0) {
            res.status(404).send('Transactions not found.');
        }

        res.status(200).send(transactions.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getTransactionById =  async (req, res) => {
    try {
        const id = req.params.id;

        const queryGetTransaction = 'SELECT * FROM transactions WHERE id = $1';

        const transactions = await db.query(queryGetTransaction, [id]);

        if (transactions.rowsCount === 0) {
            res.status(404).send('Transactions not found.');
        }

        res.status(200).send(transactions.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, value } = req.body;

        const queryCheckTransaction = 'SELECT * FROM transactions WHERE id = $1';
        const queryUpdateEnvelope = 'UPDATE envelopes SET budget = $1 WHERE id IN (SELECT envelope_id FROM transactions WHERE id = $2)';
        const queryUpdateTransaction = 'UPDATE transactions SET title = $1, value = $2 WHERE id = $3 RETURNING *';

        // TRANSACTION
        await db.query('BEGIN');

        const checkTransaction = await db.query(queryCheckTransaction, [id]);

        if (checkTransaction.rowsCount === 0) {
            res.status(404).send('Transaction not found.');
        }

        const updateEnvelope = await db.query(queryUpdateEnvelope, [value, id])
        const updatetransaction = await db.query(queryUpdateTransaction, [title, value, id]);
        
        await db.query('COMMIT');

        res.status(200).send(updateTransaction.rows);
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).send(error);
    }
}

exports.deleteTransaction = async (req, res) => {
    const id = req.params.id;

    const queryGetTransaction = 'SELECT * FROM transactions WHERE id = $1';
    const queryUpdateEnvelope = 'UPDATE envelopes SET budget = budget + (SELECT value FROM transactions WHERE id = $1) WHERE id IN (SELECT envelope_id FROM transactions WHERE id = $1)';
    const queryDeleteTransaction = 'DELETE FROM transactions WHERE id = $1';
    
    try {
        const checkTransaction = await db.query(queryGetTransaction, [id]);

        if (checkTransaction.rowCout === 0) {
            return res.status(404).send('Trasaction not found.');
        }
        await db.query(queryUpdateEnvelope, [id]); 
        await db.query(queryDeleteTransaction);
    } catch (error) {
        res.status(500).send(error);
    }
}