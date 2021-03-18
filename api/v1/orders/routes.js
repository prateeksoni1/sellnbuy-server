const router = require('express').Router();

const { checkAuthStatus, isUser } = require('../users/controllers');
const { getOrders, addOrder } = require('./controllers');

router.get('/', checkAuthStatus, getOrders);
router.post('/', checkAuthStatus, isUser, addOrder);

module.exports = router;
