const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

router.post('/', (req, res, next) => {
    let url = req.body['url'];
    let body = req.body['body'];
    fetch(url, {
        method: 'POST',
        mode: "no-cors",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept-language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
            'accept-encoding': 'gzip, deflate, br',
            't': 'text/csv;application/vnd.ms-excel',
            'X-Content-Type-Options': 'nosniff'
        },
        body: body
    })
        .then(response => response.text())
        .then(text => res.send(processText(text)))
        .catch(e => console.log(e));

});

function processText(text) {
    let lines = text.split('\n');
    let split;
    let json = {quoteDate: '', quoteValue: ''}

    if (lines.length > 2) {
        lines.splice(0, 2);
        lines.splice(1);
        split = lines[0].split('"');
        json.quoteDate = split[1];
        json.quoteValue = split[3];
    }

    return json;
}

module.exports = router;