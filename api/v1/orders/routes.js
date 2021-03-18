const { checkAuthStatus } = require('../users/controllers');
const { getOrders, addOrder } = require('./controllers');
const router = require('express').Router();

router.get('/', checkAuthStatus, getOrders);
router.post('/', checkAuthStatus, addOrder);

module.exports = router;
