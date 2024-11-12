'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Analyses', [{
      "name": "Microalbuminuria",
      "units": " mg/L",
      "referenceValue": "Normal : 0/30\nMicroalbuminuria: 30-300\nAlbuminuria Clinica: mayor a 300",
      "AnalysisTypeId": 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      "name": "Creatinuria",
      "units": " mg/dL",
      "AnalysisTypeId": 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      "name": "Relacion Microalbuminuria/Creatinuria",
      "units": " mg/gr",
      "AnalysisTypeId": 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Analyses', null, {});
  }
};
