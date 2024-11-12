'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        defaultValue: "",
        type: Sequelize.STRING
      },
      secondName: {
        defaultValue: "",
        type: Sequelize.STRING
      },
      lastName: {
        defaultValue: "",
        type: Sequelize.STRING
      },
      secondSurname: {
        defaultValue: "",
        type: Sequelize.STRING
      },
      numberId: {
        type: Sequelize.BIGINT,
        unique: true
      },
      phone: {
        type: Sequelize.STRING
      },
      cellphone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      TypeIDId: {
        type: Sequelize.INTEGER
      },
      GenderId: {
        type: Sequelize.INTEGER
      },
      MaritalStatusId: {
        type: Sequelize.INTEGER
      },    
      Adult: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('People');
  }
};