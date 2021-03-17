const { Model, DataTypes } = require('sequelize');
const db = require('../../../../db');

class User extends Model {}

User.init(
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      isEmail: true,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact: {
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
  {
    sequelize: db,
    timestamps: true,
  }
);

module.exports = User;
