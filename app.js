const express = require('express');
const app = express();
const PORT = 5000;

const bodyParser = require('body-parser')
const envelopesRouter = require('./routes/envelopes');

let id = 4;


// Parser body
app.use(bodyParser.json());


app.use('/envelopes', envelopesRouter);

// Listen server
app.listen(PORT, () => console.log('Listening in port ', PORT));

module.exports = app;
