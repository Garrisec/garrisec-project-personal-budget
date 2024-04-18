const checkUserInputEmpty = require('../helpers/db-helpers');

// Datas database
const envelopes = [
    {
        title: "Gas",
        budget: 150,
        id: 1
    },
    {
        title: "Clothes",
        budget: 250,
        id: 2
    },
    {
        title: "Transport",
        budget: 250,
        id: 3
    }
]

// Parse parameter
exports.parsingParameters = (req, res, next, id) => {
    try {
        req.envelope = id;
        next();
    } catch (err) {
        res.status(500).send(err)
    }
};

// POST: Create a envelope
exports.createEnvelopes = (req, res, next) => {
    try {
        const isValid = checkUserInputEmpty(req.body);
        console.log(req.body);
        if (isValid === true) {
            req.body.id = id++;
            envelopes.push(req.body);
            console.log(envelopes);
            res.status(201).send(req.body);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        console.log('deu erro')
        res.status(500).send(err);
    }    
}

// GET: Get all envelopes
exports.getAllEnvelopes = (req, res, next) => {
    try {
        res.status(200).send(envelopes);
    } catch (err) {
        res.status(500).send(err);
    }
}

// GET: Get specific envelope by id
exports.getSpecificEnvelope = (req, res, next) => {
    try {
        const envelope = envelopes.find((element) => element.id === Number(req.envelope));
        
        if (!envelope) {
            return res.status(404).send({message: 'Envelope Not Found'});
        }

        res.status(200).send(envelope);
    } catch (err) {
        res.status(500).send(err);
    }
};

// PUT: Update specific envelope by id
exports.updateSpecificEnvelope = (req, res, next) => {
    try {
        let envelope = envelopes.find((element) => element.id === Number(req.envelope));

        if (!envelope) {
            return res.status(404).send({message: 'Envelope Not Found'});
        } 

        envelope.budget = envelope.budget - req.body.budget;    
        res.status(200).send(envelope);
    } catch (err) {
        res.status(500).send(err);
    }
}

// DELETE: Delete a specific envelope by id
exports.deleteSpecificEnvelope = (req, res, next) => {
    try {
        let envelope = envelopes.findIndex((element) => element.id === Number(req.envelope));
        
        if (envelope === -1) {
            return res.status(404).send({message: 'Envelope Not Found'});
        }
        
        envelopes.splice(envelope,1);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err);
    }
}

// POST: Post endpoint that uses two parameters and transfers a value from one envelope to another by id
exports.transferValueEnvelope = (req, res, next) => {
    try {
        let fromEnvelope = envelopes.find((element) => element.id === Number(req.params.from));
        let toEnvelope = envelopes.find((element) => element.id === Number(req.params.to));
        
        if (!fromEnvelope || !toEnvelope) {
            return res.status(404).send({message: 'Envelope Not Found'});
        }

        fromEnvelope.budget -= Number(req.body.value);
        toEnvelope.budget += Number(req.body.value);

        res.status(200).send([fromEnvelope, toEnvelope]);
    } catch (err) {
        res.status(500).send(err);
    }
}
