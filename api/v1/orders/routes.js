const { getOrders, addOrder } = require('./controllers');
const router = require('express').Router();

router.route('/').get(getOrders).post(addOrder);

module.exports = router;
