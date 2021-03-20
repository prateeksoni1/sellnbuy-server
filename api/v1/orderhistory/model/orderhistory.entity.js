const { Model, DataTypes } = require('sequelize');
const db = require('../../../../db');
const Order = require('../../orders/model/orders.entity');
class OrderHistory extends Model {}
OrderHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: true,
  },
);
OrderHistory.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = OrderHistory;
