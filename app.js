const express = require('express');
const app = express();
const PORT = 6000;

const bodyParser = require('body-parser')
const envelopesRouter = require('./routes/envelopes');
const transactionsRouter = require('./routes/transactions');


// Parser body
app.use(bodyParser.json());


app.use('/envelopes', envelopesRouter);
app.use('/transactions', transactionsRouter);

// Listen server
app.listen(PORT, () => console.log('Listening in port ', PORT));

module.exports = app;
