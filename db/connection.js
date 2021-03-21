const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('osba', 'root', 'root', {
  dialect: 'mysql',
  host: 'db',
});

const connectDb = async () => {
  await sequelize.authenticate();
  // eslint-disable-next-line no-console
  console.info('DB connected');

  sequelize.sync();
};

connectDb();

module.exports = sequelize;
