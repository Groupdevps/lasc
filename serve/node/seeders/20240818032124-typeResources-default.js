'use strict';

const { TypeResources } = require('../lib/resources');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const types = TypeResources.map(type => ({
      name: type.name,
      isActive: type.isActive,
      keyForm: type.keyForm,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('TypeResources', types, {});
  },

  down: async (queryInterface, Sequelize) => {
    const typeNames = TypeResources.map(type => type.name);
    await queryInterface.bulkDelete('TypeResources', {
      name: {
        [Sequelize.Op.in]: typeNames,
      },
    }, {});
  }
};
