'use strict';

const { TypeResources } = require('../lib/resources');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch TypeResources from the database to get their IDs
    const typeRecords = await queryInterface.sequelize.query(
      `SELECT id, name FROM "TypeResources";`
    );
    const typeMap = typeRecords[0].reduce((map, type) => {
      map[type.name] = type.id;
      return map;
    }, {});

    const resources = TypeResources.flatMap(type =>
      type.Resources.map(resource => ({
        name: resource.name,
        isActive: resource.isActive,
        keyForm: resource.keyForm,
        TypeResourceId: typeMap[type.name], // Use the ID from the type map
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    await queryInterface.bulkInsert('Resources', resources, {});
  },

  down: async (queryInterface, Sequelize) => {
    const resourceNames = TypeResources.flatMap(type =>
      type.Resources.map(resource => resource.name)
    );
    await queryInterface.bulkDelete('Resources', {
      name: {
        [Sequelize.Op.in]: resourceNames,
      },
    }, {});
  }
};
