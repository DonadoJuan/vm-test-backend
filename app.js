const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const exchangeRateRouter = require('./routers/exchangeRateRouter');
const userRouter = require('./routers/userRouter');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('', exchangeRateRouter);
app.use('/usuarios', userRouter);


mongoose.connect('mongodb://localhost:27017/virtualmind',{ useNewUrlParser: true });

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connection.on('connected', () => {
    console.log('Connection to MongoDB established');
    app.listen(3000, () => {
        console.log('API running on port 3000');
    });
});
