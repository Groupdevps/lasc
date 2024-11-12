'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      zone: {
        type: Sequelize.INTEGER
      },
      DistrictId: {
        type: Sequelize.INTEGER
      },
      CityId: { 
        type : Sequelize.INTEGER, 
      },
      StateId:{
        type: Sequelize.INTEGER        
      },
      state: {
        type: Sequelize.INTEGER,
       
      },
      PersonId:{
        type: Sequelize.INTEGER
      },
      CenterId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};