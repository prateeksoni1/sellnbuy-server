const router = require('express').Router();
const { checkAuthStatus, isUser } = require('../users/controllers');
const { getOrderHistory, addMultipleOrderHistory } = require('./controllers');

router.get('/', checkAuthStatus, isUser, getOrderHistory);
router.post('/', checkAuthStatus, isUser, addMultipleOrderHistory);

module.exports = router;
