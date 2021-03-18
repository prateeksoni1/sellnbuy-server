const router = require('express').Router();
const { checkAuthStatus, isUser } = require('../users/controllers');
const { getOrderHistory } = require('./controllers');

router.post('/', checkAuthStatus, isUser, getOrderHistory);

module.exports = router;
