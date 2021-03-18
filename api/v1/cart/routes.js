const argon2 = require("argon2");
const Cart = require("./model/cart.entity");
const router = require("express").Router();

const router = require("./model/cart.entity");

router.route("/")
  .post(async (req, res) => {
    const {userId} = req.body;

    const cart = await Cart.create({
      userId
    });

    return res.status(201).json({
      ok: true,
      cart,
    });
  });


