const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1', require('./api/v1'));

module.exports = app;
