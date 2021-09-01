'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Nuddges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.INTEGER
      },
      boostDate: {
        type: Sequelize.STRING
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {model: 'Users', field: 'id'}
      },

      category: {
        type: Sequelize.STRING
      },

     createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Nuddges');
  }
};