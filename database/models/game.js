'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
    }
  };
  Game.init({
    balance: DataTypes.INTEGER,
    sessionID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
    freezeTableName: true,
    tableName: 'Game'
  });
  return Game;
};
