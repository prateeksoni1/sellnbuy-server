const { checkAuthStatus, isUser } = require('../users/controllers');
const { getOrders, addOrder } = require('./controllers');
const router = require('express').Router();

router.get('/', checkAuthStatus, getOrders);
router.post('/', checkAuthStatus, isUser, addOrder);

module.exports = router;
