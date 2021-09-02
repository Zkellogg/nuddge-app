'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.User.hasMany(models.Nuddge, { as: 'nuddges', foreignKey: 'user_id' })
        }
    };
    User.init({
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        total_points: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};