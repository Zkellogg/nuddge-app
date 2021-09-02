'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Nuddge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Nuddge.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'})
    }
  };
  Nuddge.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    points: DataTypes.INTEGER,
    boostDate: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    total_points: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nuddge',
  });
  return Nuddge;
};