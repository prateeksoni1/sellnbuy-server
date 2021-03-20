const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('osbd', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDb = async () => {
  await sequelize.authenticate();
  // eslint-disable-next-line no-console
  console.info('DB connected');

  // require('../api/v1/users/model/users.entity');
  // require('../api/v1/cart/model/cart.entity');
  // require('../api/v1/products/model/products.entity');
  // require('../api/v1/orders/model/orders.entity');

  // sequelize.sync({ force: true });
};

connectDb();

module.exports = sequelize;
