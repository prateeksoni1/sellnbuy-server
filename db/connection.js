const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('osbd', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

const connectDb = async () => {
  await sequelize.authenticate();
  // eslint-disable-next-line no-console
  console.info('DB connected');

  sequelize.sync();
};

connectDb();

module.exports = sequelize;
