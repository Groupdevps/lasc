'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [superUsuarioRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'ADMINISTRADOR' LIMIT 1;`
    );
    const superUsuarioRoleId = superUsuarioRole[0]?.id;

    if (!superUsuarioRoleId) {
      console.log('No se encontró el rol ADMINISTRADOR.');
      return;
    }

    // Buscar el recurso MANUAL TARIFARIO
    const resource = await queryInterface.sequelize.query(
      `SELECT id FROM "Resources" WHERE name = 'MANUAL TARIFARIO' LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (resource.length === 0) {
      throw new Error('No se encontró el recurso MANUAL TARIFARIO.');
    }

    const resourceId = resource[0].id;

    // Insertar permisos completos para el rol ADMINISTRADOR y el recurso MANUAL TARIFARIO
    await queryInterface.bulkInsert('Permissions', [{
      RoleId: superUsuarioRoleId,
      ResourceId: resourceId,
      canAdd: true,
      canEdit: true,
      canView: true,
      canDelete: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    const [superUsuarioRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'ADMINISTRADOR' LIMIT 1;`
    );
    const superUsuarioRoleId = superUsuarioRole[0]?.id;

    if (!superUsuarioRoleId) {
      console.log('No se encontró el rol ADMINISTRADOR.');
      return;
    }


    // Buscar el recurso MANUAL TARIFARIO
    const resource = await queryInterface.sequelize.query(
      `SELECT id FROM "Resources" WHERE name = 'MANUAL TARIFARIO' LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (resource.length === 0) {
      throw new Error('No se encontró el recurso MANUAL TARIFARIO.');
    }

    const resourceId = resource[0].id;

    // Eliminar los permisos para el rol ADMINISTRADOR y el recurso MANUAL TARIFARIO
    await queryInterface.bulkDelete('Permissions', {
      RoleId: roleId,
      ResourceId: resourceId
    }, {});
  }
};
