const Orders = require('./model/orders.entity');

exports.getOrders = async (req, res) => {
  const orders = await Orders.findAll();

  return res.status(200).json({
    ok: true,
    orders,
  });
};

exports.addOrder = async (req, res) => {
  const { productId, cartId } = req.body;

  const order = await Orders.create({
    productId,
    cartId,
  });

  return res.status(201).json({
    ok: true,
    order,
  });
};
