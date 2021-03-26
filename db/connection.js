const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sellnbuy', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

const connectDb = async () => {
  await sequelize.authenticate();
  // eslint-disable-next-line no-console
  console.info('DB connected');

  // require('../api/v1/users/model/users.entity');
  // require('../api/v1/products/model/products.entity');
  // require('../api/v1/cart/model/cart.entity');
  // require('../api/v1/orders/model/orders.entity');

  sequelize.sync();
};

connectDb();

module.exports = sequelize;
