const Cart = require('../cart/model/cart.entity');
const Orders = require('../orders/model/orders.entity');
const OrderHistory = require('./model/orderhistory.entity');
const Product = require('../products/model/products.entity');
const User = require('../users/model/users.entity');

exports.getOrderHistory = async (req, res) => {
  const orderHistory = await OrderHistory.findAll();

  return res.status(200).json({
    ok: true,
    orderHistory,
  });
};

exports.getOrderHistoryForUser = async (req, res) => {
  const { user } = req;
  const cart = await Cart.findOne({
    where: {
      userId: user.id,
    },
  });
  console.log(cart);
  if (!cart) {
    return res.status(404).json({
      ok: false,
      message: 'No cart found for the user',
    });
  }
  const orders = await Orders.findAll({
    where: {
      cartId: cart.id,
      isPurchased: true,
    },
    include: [
      {
        model: Product,
      },
    ],
  });

  if (!orders) {
    return res.status(404).json({
      ok: false,
      message: 'No order history found for the user',
    });
  }
  let orderHistories = [];
  for (let i = 0; i < orders.length; i++) {
    orderHistories = await OrderHistory.findAll({
      where: {
        orderId: orders[i].id,
      },
      include: [
        {
          model: Orders,
          include: [
            {
              model: Product,
              include: [
                {
                  model: User,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!orderHistories) {
      return res.status(404).json({
        ok: false,
        message: 'No order history found for the user',
      });
    }
    console.log(orderHistories);
  }
  return res.status(200).json({
    ok: true,
    orderHistories,
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
