const OrderHistory = require('./model/orderhistory.entity');

exports.getOrderHistory = async (req, res) => {
  const orderHistory = await OrderHistory.findAll();

  return res.status(200).json({
    ok: true,
    orderHistory,
  });
};