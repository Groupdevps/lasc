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
    await queryInterface.bulkInsert('Regimes', [{
        name: 'Contributivo', 
        center : true,  
        person : true,  
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Subsidiado',
        center : true,  
        person : true,         
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Vinculado',  
        center : false,    
        person : true,    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Particular',   
        center : true, 
        person : true,      
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Secretaria de Salud',   
        center : false,  
        person : true,     
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Empresa',   
        center : false,  
        person : true,     
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Desplazado afiliado al regimen contributivo',    
        center : false,  
        person : true,    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Desplazado afiliado al regimen subsidiado',   
        center : false, 
        person : true,      
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Desplazado no afiliado (Vinculado)',    
        center : false,  
        person : true,    
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Extranjero',   
        center : false, 
        person : true,      
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Ambos regímenes',
        center : true,
        person : false,       
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        name: 'Otro',  
        center : false, 
        person : true,    
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
    await queryInterface.bulkDelete('Regimes', null, {});
  }
};
