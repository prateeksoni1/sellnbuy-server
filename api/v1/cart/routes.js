const { addCart } = require('./controllers');
const router = require('express').Router();

const router = require('./model/cart.entity');

router.route('/').post(addCart);
