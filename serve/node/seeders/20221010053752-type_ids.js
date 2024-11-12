'use strict';

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
    await queryInterface.bulkInsert('TypeIDs', [
      {
        name: 'CC',
        description: 'Cedula de Ciudadania',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'TI',
        description: 'Tarjeta de Identidad',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'CE',
        description: 'Cedula de Extranjeria',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'PA',
        description: 'Pasaporte',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },

      {
        name: 'RC',
        description: 'Registro Civil',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'NU',
        description: 'No. Único de Id. Personal',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },

      {
        name: 'AS',
        description: 'Adulto sin identificación',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'MS',
        description: 'Menor sin Identificación',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'CD',
        description: 'Carnet diplomático',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'CN',
        description: 'Certificado Nacido Vivo',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'SC',
        description: 'Salvo Conducto',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'PE',
        description: 'Per Especial Permanencia',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'PT',
        description: 'Permiso por Protección Temporal diplomático',    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      


    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TypeIDs', null, {});
  }
};
