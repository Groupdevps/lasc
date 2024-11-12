'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const detailTypes = [
      { name: 'MEDICAMENTOS', description: 'Detalles relacionados con medicamentos' },
      { name: 'SERVICIOS', description: 'Detalles relacionados con servicios' },
      { name: 'INSUMOS', description: 'Detalles relacionados con insumos' },
      { name: 'LABORATORIO', description: 'Detalles relacionados con laboratorios' },
      { name: 'IMÁGENES DIAGNOSTICAS', description: 'Detalles relacionados con imágenes diagnósticas' },
      { name: 'ESTANCIAS', description: 'Detalles relacionados con estancias' },
      { name: 'TRASLADOS', description: 'Detalles relacionados con traslados' }
    ];

    const timestamp = {
      active:true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const data = detailTypes.map(type => ({
      ...type,
      ...timestamp
    }));

    await queryInterface.bulkInsert('DetailTypes', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DetailTypes', null, {});
  }
};
