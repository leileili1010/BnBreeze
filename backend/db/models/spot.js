'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
       })

      Spot.hasMany(models.SpotImage, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE', 
      hooks: true
      })

      Spot.hasMany(models.Booking, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE', 
      hooks: true
      })

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE', 
        hooks: true
        })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    address: {
      type: DataTypes.STRING(50),
      allowNull: false
    }, 
    city: {
      type: DataTypes.STRING(20),
      allowNull: false
    }, 
    state: {
      type: DataTypes.STRING(20),
      allowNull: false
    }, 
    country: {
      type: DataTypes.STRING(20),
      allowNull: false
    }, 
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};