'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Buscar el RoleId para "MEDICO GENERAL"
    const [medicoGeneralRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'MEDICO GENERAL' LIMIT 1;`
    );
    const medicoGeneralRoleId = medicoGeneralRole[0]?.id;

    if (!medicoGeneralRoleId) {
      console.log('No se encontró el rol MEDICO GENERAL.');
      return;
    }

    // Buscar el TypeResourceId para "MEDICO"
    const [medicoTypeResource] = await queryInterface.sequelize.query(
      `SELECT id FROM "TypeResources" WHERE name = 'MEDICO' LIMIT 1;`
    );
    const medicoTypeResourceId = medicoTypeResource[0]?.id;

    if (!medicoTypeResourceId) {
      console.log('No se encontró el tipo de recurso MEDICO.');
      return;
    }

    // Obtener todos los recursos del tipo "MEDICO"
    const resources = await queryInterface.sequelize.query(
      `SELECT id FROM "Resources" WHERE "TypeResourceId" = ${medicoTypeResourceId} AND "isActive" = true;`
    );
    
    const resourceIds = resources[0].map(resource => resource.id);

    // Crear permisos para cada recurso
    const permissions = resourceIds.map(resourceId => ({
      RoleId: medicoGeneralRoleId,
      ResourceId: resourceId,
      canAdd: true,
      canEdit: true,
      canView: true,
      canDelete: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insertar los permisos en la base de datos
    await queryInterface.bulkInsert('Permissions', permissions);
  },

  async down (queryInterface, Sequelize) {
    // Revertir la inserción de permisos para el rol MEDICO GENERAL
    const [medicoGeneralRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'MEDICO GENERAL' LIMIT 1;`
    );
    const medicoGeneralRoleId = medicoGeneralRole[0]?.id;

    if (medicoGeneralRoleId) {
      await queryInterface.bulkDelete('Permissions', { RoleId: medicoGeneralRoleId });
    }
  }
};
