const { checkAuthStatus, isUser } = require('../users/controllers');
const { getOrderHistory } = require('./controllers');
const router = require('express').Router();

router.post('/', checkAuthStatus, isUser, getOrderHistory);

module.exports = router;
