'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Services', [
      {
        name: 'CIRUJANO',
        serviceType: 'SERVICIOS PROFESIONALES',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ANESTESIOLOGO',
        serviceType: 'SERVICIOS PROFESIONALES',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'AYUDANTE QUIRURGICO',
        serviceType: 'SERVICIOS PROFESIONALES',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'DERECHOS DE SALA DE QUIROFANO',
        serviceType: 'DERECHOS DE SALA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MATERIALES',
        serviceType: 'MATERIALES',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Services', {
      name: ['CIRUJANO', 'ANESTESIOLOGO', 'AYUDANTE QUIRURGICO', 'DERECHOS DE SALA DE QUIROFANO', 'MATERIALES']
    }, {});
  }
};
