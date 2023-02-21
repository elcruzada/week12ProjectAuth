'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true})
    }
  }
  Booking.init({
    spotId: {
     type: DataTypes.INTEGER,
     allowNull: false,
     onDelete: "CASCADE",
     hooks: true
    },
    userId: {
     type: DataTypes.INTEGER,
     allowNull: false,
     onDelete: "CASCADE",
     hooks: true
    },
    startDate: {
     type: DataTypes.DATE,
     allowNull: false,
    },
    endDate: {
     type: DataTypes.DATE,
     allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};