'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
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
      type: DataTypes.STRING(50),
      allowNull: false
    }, 
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -90,
        max: 90
      }
    }, 
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }, 
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }

    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};