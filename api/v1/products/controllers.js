const Product = require('./model/products.entity');

exports.getProducts = async (req, res) => {
  const products = await Product.findAll();

  return res.status(200).json({
    ok: true,
    products,
  });
};

exports.addProduct = async (req, res) => {
  const { name, price, category, ownerId } = req.body;

  const product = await Product.create({
    name,
    price,
    ownerId,
    category,
  });

  return res.status(201).json({
    ok: true,
    product,
  });
};
