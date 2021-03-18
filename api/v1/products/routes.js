const { checkAuthStatus } = require('../users/controllers');
const { getProducts, addProduct } = require('./controllers');

const router = require('express').Router();

router.get('/', checkAuthStatus, getProducts);

router.post('/', checkAuthStatus, addProduct);

module.exports = router;
