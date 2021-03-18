const router = require('express').Router();

const { checkAuthStatus } = require('../users/controllers');
const { getProducts, addProduct } = require('./controllers');

router.get('/', checkAuthStatus, getProducts);

router.post('/', checkAuthStatus, addProduct);

module.exports = router;
