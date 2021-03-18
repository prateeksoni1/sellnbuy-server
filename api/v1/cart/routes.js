const { checkAuthStatus, isUser } = require('../users/controllers');
const { addCart } = require('./controllers');
const router = require('express').Router();

router.post('/', checkAuthStatus, isUser, addCart);

module.exports = router;
