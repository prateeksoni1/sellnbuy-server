const router = require('express').Router();

const { checkAuthStatus, isUser } = require('../users/controllers');
const {
  getOrders,
  addOrder,
  getOrdersForUser,
  deleteOrder,
} = require('./controllers');

router.get('/', checkAuthStatus, getOrders);
router.post('/', checkAuthStatus, isUser, addOrder);
router.get('/cart', checkAuthStatus, isUser, getOrdersForUser);
router.delete('/:orderId', checkAuthStatus, isUser, deleteOrder);
module.exports = router;
