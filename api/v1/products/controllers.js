const User = require('../users/model/users.entity');
const Product = require('./model/products.entity');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: User,
          required: true,
        },
      ],
    });

    return res.status(200).json({
      ok: true,
      products,
    });
  } catch (err) {
    return next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, price, image } = req.body;

    const product = await Product.create({
      name,
      price,
      ownerId: user.id,
      image,
    });

    return res.status(201).json({
      ok: true,
      product,
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
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