'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistoryInfoMedicPeople', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberId: {
        type: Sequelize.STRING
      },

      //info medica

      motive: {
        type: Sequelize.STRING
      },
      personalHistory: {
        type: Sequelize.TEXT
      },
      familyBackground: {
        type: Sequelize.TEXT
      },
      allergic: {
        type: Sequelize.TEXT
      },
      glasgow: {
        type: Sequelize.STRING
      },
      glucometry: {
        type: Sequelize.STRING
      },
      temperature: { 
        type: Sequelize.STRING
      },
      fr: {
        type: Sequelize.STRING
      },
      fc: {
        type: Sequelize.STRING
      },
      pa1: {
        type: Sequelize.STRING
      },
      pa: {
        type: Sequelize.STRING
      },
      isc: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      pregnancy: {
        type: Sequelize.BOOLEAN
      },
      pregnancyTime: {
        type: Sequelize.STRING
      },
      f: {
        type: Sequelize.STRING
      },
      u: {
        type: Sequelize.STRING
      },
      r: {
        type: Sequelize.STRING
      },
      tg: {
        type: Sequelize.STRING
      },
      f1: {
        type: Sequelize.STRING
      },
      p: {
        type: Sequelize.STRING
      },
      p1: {
        type: Sequelize.STRING
      },
      g: {
        type: Sequelize.STRING
      },
      p2: {
        type: Sequelize.STRING
      },
      a: {
        type: Sequelize.STRING
      },
      c: {
        type: Sequelize.STRING
      },
      cause: {
        type: Sequelize.STRING
      },
      cytology: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.STRING
      },
      transferred: {
        type: Sequelize.BOOLEAN
      },
      medicalSignature: {
        type: Sequelize.STRING
      },

      //aditional
      paraclinical: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('HistoryInfoMedicPeople');
  }
};