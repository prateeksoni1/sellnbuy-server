const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('osbd', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDb = async () => {
  await sequelize.authenticate();
  console.log('DB connected');
  require('../api/v1/users/model/users.entity');
  require('../api/v1/cart/model/cart.entity');
  require('../api/v1/products/model/products.entity');

  sequelize.sync({ force: true });
};

connectDb();

module.exports = sequelize;
