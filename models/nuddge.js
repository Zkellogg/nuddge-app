'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nuddge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Nuddge.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    points: DataTypes.INTEGER,
    boostDate: DataTypes.STRING,
    categories: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nuddge',
  });
  return Nuddge;
};