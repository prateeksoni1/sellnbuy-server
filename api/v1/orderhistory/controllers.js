const Cart = require('../cart/model/cart.entity');
const Orders = require('../orders/model/orders.entity');
const OrderHistory = require('./model/orderhistory.entity');

exports.getOrderHistory = async (req, res) => {
  const orderHistory = await OrderHistory.findAll();

  return res.status(200).json({
    ok: true,
    orderHistory,
  });
};

exports.getOrderHistoryForUser = async(req,res)=>{
  const {user} = req;
  const cart = await Cart.findOne({
    where: {
      userId: user.id,
    },
  });

  const order = await Orders.findOne({
    where: {
      cartId = cart.id,
    },
  });
  
  
}