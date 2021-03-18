const { getProducts, addProduct } = require('./controllers');

const router = require('express').Router();

router.route('/').get(getProducts).post(addProduct);

module.exports = router;
