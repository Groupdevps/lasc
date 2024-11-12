'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('AnalysisLaboratories', [{
      AnalysisId: 1,
      cup: "903026",
      CupsListId: 11413,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      AnalysisId: 2,
      cup: "903026",
      CupsListId: 11413,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      AnalysisId: 3,
      cup: "903026",
      CupsListId: 11413,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AnalysisLaboratories', null, {});
     
  }
};
