const argon2 = require("argon2");
const router = require("express").Router();

const Product = require("./model/products.entity");

router
.route("/")
.get(async (req, res) => {
    const products = await Product.findAll();

    return res.status(200).json({
      ok: true,
      products,
    });
  })
  .post(async (req, res) => {
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
  });

module.exports = router;
