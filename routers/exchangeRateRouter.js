const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/dolar/quote', (req, res) => {

    request('http://www.bancoprovincia.com.ar/principal/dolar', (error, response, body) => {
        if(error)
        res.status(500).json(error);
        
        body = JSON.parse(body);
        const exchangeRateData = {
            buyingRate: body[0],
            sellingRate: body[1],
            updatedTo: new Date()

        };
        res.send({code:'00', message:'quote retrivied', data: exchangeRateData});
    });

});

router.get(['/pesos/quote','/real/quote'], (req, res) => {
        res.status(501).send({code:'501', message:'not implemented'});
});

module.exports = router;