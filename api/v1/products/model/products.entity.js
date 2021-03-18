const { Model, DataTypes } = require('sequelize');
const db = require('../../../../db');
const User = require('../../users/model/users.entity');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('a', 'b'),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: true,
  }
);

Product.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Product;
