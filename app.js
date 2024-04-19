const express = require('express');
const app = express();
const PORT = 6000;

const bodyParser = require('body-parser')
const envelopesRouter = require('./routes/envelopes');


// Parser body
app.use(bodyParser.json());


app.use('/envelopes', envelopesRouter);

// Listen server
app.listen(PORT, () => console.log('Listening in port ', PORT));

module.exports = app;
