const { checkAuthStatus } = require('../users/controllers');
const { addCart } = require('./controllers');
const router = require('express').Router();

const router = require('./model/cart.entity');

router.post('/', checkAuthStatus, addCart);

module.exports = router;
