'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Nuddges', 'categories', {
        type:Sequelize.STRING
      })
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Nuddges', 'categories')
  
  }
};
