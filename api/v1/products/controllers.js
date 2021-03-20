const User = require('../users/model/users.entity');
const Product = require('./model/products.entity');

exports.getProducts = async (req, res) => {
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
};

exports.addProduct = async (req, res) => {
  const { user } = req;
  const { name, price, category, image } = req.body;

  const product = await Product.create({
    name,
    price,
    ownerId: user.id,
    category,
    image,
  });

  return res.status(201).json({
    ok: true,
    product,
  });
};
