'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const typeResource = await queryInterface.sequelize.query(
      `SELECT id FROM "TypeResources" WHERE name = 'FACTURACION' LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (typeResource.length === 0) {
      throw new Error('No se encontró el TypeResource con el nombre "FACTURACION".');
    }

    const typeResourceId = typeResource[0].id;

    // Inserta el nuevo Resource
    await queryInterface.bulkInsert('Resources', [{
      TypeResourceId: typeResourceId,
      name: 'MANUAL TARIFARIO',
      keyForm: 'ConceptsComponent',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Resources', {
      name: 'MANUAL TARIFARIO'
    }, {});
  }
};
