var express = require('express');
var router = express.Router();

const {
    parsingParameters,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} = require('../controlers/transactions.js');

router.param('id', parsingParameters);

router.get('/', getTransactions);

router.get('/:id', getTransactionById);

router.put('/update/:id', updateTransaction);

router.delete('/delete/:id', deleteTransaction)

module.exports = router;