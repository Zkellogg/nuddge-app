'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Nuddges', 'status', {
      type: Sequelize.BOOLEAN
      
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Nuddges', 'status')
  }
};
