const Cart = require('../cart/model/cart.entity');
const Orders = require('./model/orders.entity');

exports.getOrders = async (req, res) => {
  const orders = await Orders.findAll();

  return res.status(200).json({
    ok: true,
    orders,
  });
};

exports.addOrder = async (req, res) => {
  const { user } = req;

  let cart = await Cart.findOne({
    where: {
      userId: user.id,
    },
  });

  // check this again
  if (!cart) {
    cart = await Cart.create({
      userId: user.id,
    });
  }
  const { productId } = req.body;

  const order = await Orders.create({
    productId,
    cartId: cart.id,
  });

  return res.status(201).json({
    ok: true,
    order,
  });
};
