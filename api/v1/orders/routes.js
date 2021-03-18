const argon2 = require('argon2');
const router = require('express').Router();

const Orders = require('./model/orders.entity');

router
  .route('/')
  .get(async (req, res) => {
    const orders = await Orders.findAll();

    return res.status(200).json({
      ok: true,
      orders,
    });
  })
  .post(async (req, res) => {
    const { productId, cartId } = req.body;
   
   
    const order = await Orders.create({
      productId,
      cartId
    });

    return res.status(201).json({
      ok: true,
      order,
    });
  });

module.exports = router;
