'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Nuddges', 'user_id', {
      type:Sequelize.INTEGER,
      references: {model: 'Users', field: 'id'}
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Nuddges', 'user_id')
  }
};

