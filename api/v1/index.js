const router = require('express').Router();

router.use('/users', require('./users/routes'));
router.use('/products', require('./products/routes'));
router.use('/cart', require('./cart/routes'));
router.use('/orders', require('./orders/routes'));
router.use('/orderhistory', require('./orderhistory/routes'));

module.exports = router;
