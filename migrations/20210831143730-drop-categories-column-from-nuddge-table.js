'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Nuddges','categories');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Nuddges')
  }
};
