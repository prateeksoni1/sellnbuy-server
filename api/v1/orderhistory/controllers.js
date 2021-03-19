const Orders = require('../orders/model/orders.entity');
const OrderHistory = require('./model/orderhistory.entity');

exports.getOrderHistory = async (req, res) => {
  const orderHistory = await OrderHistory.findAll();

  return res.status(200).json({
    ok: true,
    orderHistory,
  });
};

exports.addMultipleOrderHistory = async (req, res) => {
  const { orders } = req.body;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < orders.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await OrderHistory.create({
      orderId: orders[i],
    });

    // eslint-disable-next-line no-await-in-loop
    const order = await Orders.findByPk(orders[i]);
    order.isPurchased = true;
    // eslint-disable-next-line no-await-in-loop
    await order.save();
  }

  return res.status(201).json({
    ok: true,
  });
};
