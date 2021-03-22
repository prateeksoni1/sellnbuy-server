const Cart = require('../cart/model/cart.entity');
const Product = require('../products/model/products.entity');
const User = require('../users/model/users.entity');
const Orders = require('./model/orders.entity');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.findAll();

    return res.status(200).json({
      ok: true,
      orders,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getOrdersForUser = async (req, res, next) => {
  try {
    const { isPurchased } = req.query;

    const { user } = req;
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
      },
    });
    if (!cart) {
      return res.status(404).json({
        ok: false,
        message: 'No cart found for the user',
      });
    }
    const orders = await Orders.findAll({
      where: {
        cartId: cart.id,
        isPurchased,
      },
      include: [
        {
          model: Product,
          include: {
            model: User,
          },
        },
      ],
    });
    return res.status(200).json({
      ok: true,
      orders,
    });
  } catch (err) {
    return next(err);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: "Order doesn't exist",
      });
    }

    await order.destroy();

    return res.status(200).json({
      ok: true,
    });
  } catch (err) {
    return next(err);
  }
};

exports.checkoutMultipleOrders = async (req, res) => {
  const { orders } = req.body;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < orders.length; i++) {
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
