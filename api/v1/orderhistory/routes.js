const router = require('express').Router();
const { checkAuthStatus, isUser } = require('../users/controllers');
const { getOrderHistory, addMultipleOrderHistory,getOrderHistoryForUser } = require('./controllers');

router.post('/', checkAuthStatus, isUser, getOrderHistory);
router.get('/', checkAuthStatus, isUser, getOrderHistory);
router.post('/', checkAuthStatus, isUser, addMultipleOrderHistory);
router.get('/user',checkAuthStatus,isUser,getOrderHistoryForUser);
module.exports = router;
