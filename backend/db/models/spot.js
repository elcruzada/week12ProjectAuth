'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId',  onDelete: 'CASCADE', hooks: true})
      Spot.hasMany(models.Review, {foreignKey: 'spotId',  onDelete: 'CASCADE', hooks: true})
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId',  onDelete: 'CASCADE', hooks: true})
    }
  }
  Spot.init({
    ownerId: {
     type: DataTypes.INTEGER,
     allowNull: false,
     onDelete: 'CASCADE',
     hooks: true
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
     type: DataTypes.STRING,
    },
    state: {
     type: DataTypes.STRING,
    },
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
