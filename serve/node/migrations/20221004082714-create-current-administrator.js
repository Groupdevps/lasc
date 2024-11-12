'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CurrentAdministrators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nit: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: false,

      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      TypeCenterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
        /* references: {
          model: 'TypeCurrentAdministrators',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'*/

      },
      code : {
        type: Sequelize.STRING        
      },
      mobilityCode : {
        type: Sequelize.STRING        
      },
      regime : {
        type : Sequelize.STRING,
      },
      RegimeId : {
        type : Sequelize.INTEGER
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
    await queryInterface.dropTable('CurrentAdministrators');
  }
};