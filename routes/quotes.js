const express = require('express');
const quote = require('../models/quote');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.end(quote.fetchAll());
});

router.post('/', (req, res) => {
    let quoteDate = req.body['quoteDate'];
    let quoteValue = req.body['quoteValue'];

    let quoteToSave = new quote(quoteDate, quoteValue);
    quoteToSave.save();
    res.status(201);
    res.send('{"status": "201", "message": "Dodano"}');
});


router.put('/:quoteDate', (req, res) => {
    let quoteDate = req.params['quoteDate'];
    let quoteValue = req.body['quoteValue'];

    let quoteToSave = new quote(quoteDate, quoteValue);
    quoteToSave.update();
    res.status(200);
    res.send('{"status": "200", "message": "Zaktualizowano"}');
});

router.delete('/:quoteDate', (req, res) => {
    let quoteDate = req.params['quoteDate'];

    quote.delete(quoteDate);
    res.status(204);
    // res.send('');
});

module.exports = router;
