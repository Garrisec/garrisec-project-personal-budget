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
        const transactions = await db.query('SELECT * FROM transactions');

        if (transactions.rowsCount === 0) {
            res.status(404).send('Transactions not found.');
        }

        res.status(200).send(transactions.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getTransactionById =  async (req, res) => {
    const id = req.params.id;

    try {
        const transactions = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);

        if (transactions.rowsCount === 0) {
            res.status(404).send('Transactions not found.');
        }

        res.status(200).send(transactions.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateTransaction = async (req, res) => {
    const id = req.params.id;
    const { title, value } = req.body;

    try {
        const checkTransaction = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);

        if (checkTransaction.rowsCount === 0) {
            res.status(404).send('Transaction not found.');
        }

        const updateEnvelope = await db.query('UPDATE envelopes SET budget = $1 WHERE id IN (SELECT envelope_id FROM transactions WHERE id = $2)', [value, id])
        const updatetransaction = await db.query('UPDATE transactions SET title = $1, value = $2 WHERE id = $3 RETURNING *', [title, value, id]);
        
        res.status(200).send(updateTransaction.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteTransaction = async (req, res) => {
    const id = req.params.id;

    try {
        const checkTransaction = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);

        if (checkTransaction.rowCout === 0) {
            return res.status(404).send('Trasaction not found.');
        }
        await db.query('UPDATE envelopes SET budget = budget + IN (SELECT value FROM transactions WHERE id = $1) WHERE id IN (SELECT envelope_id FROM transactions WHERE id = $2)', []); 
        await db.query('DELETE FROM transactions WHERE id = $1');
    } catch (error) {
        res.status(500).send(error);
    }
}