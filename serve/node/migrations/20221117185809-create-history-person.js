'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistoryPeople', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       //info person
       age: {
        type: Sequelize.STRING
      },
     
      numberId: {
        type: Sequelize.BIGINT
      },
      TypeIDId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      secondName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      secondSurname: {
        type: Sequelize.STRING
      },
      GenderId: {
        type: Sequelize.INTEGER
      },
      cellphone: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATEONLY
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zone: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      companionName: {
        type: Sequelize.STRING
      },
      CompanionId: {
        type: Sequelize.BIGINT
      },
      occupation: {
        type: Sequelize.STRING
      },
      MaritalStatusId: {
        type: Sequelize.INTEGER
      },
      MaritalStatusString: {
        type: Sequelize.STRING        
      },
      TypeRelationshipName: {
        type: Sequelize.STRING
      },
      TriageLevel: {
        type: Sequelize.STRING
      },
      currentAdministratorName: {
        type: Sequelize.STRING
      },
      currentAdministratorNit: {
        type: Sequelize.STRING
      },
      regime: {
        type: Sequelize.STRING
      },
      membership: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('HistoryPeople');
  }
};