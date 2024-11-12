'use strict';
const levelTriages = require("../lib/levelTriage") 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('LevelTriages', [
      {
             
          name     : "Triage I" ,
          description:  "Reanimación",
          color : "red",
          createdAt : new Date(), 
          updatedAt : new Date(),             
      },
      {
         
          name     : "Triage II",
          description:  "Emergencia" ,
          color : "orange",
          createdAt : new Date(), 
          updatedAt : new Date(),                 
      },
      {
         
          name     : "Triage III",
          description:  "Urgencia"  ,
          color : "yellow",
          createdAt : new Date(), 
          updatedAt : new Date(),                  
      },
      {
         
          name     : "Triage IV",
          description:  "Urgencia menor" ,
          color : "green",
          createdAt : new Date(), 
          updatedAt : new Date(),                   
      },
      {
         
          name     : "Triage V",
          description:  "Sin urgencia",
          color : "blue",
          createdAt : new Date(), 
          updatedAt : new Date(),                    
      }
      
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('LevelTriages', null, {});
  }
};
