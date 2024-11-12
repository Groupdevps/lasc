'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Buscar el RoleId para "ADMISIONISTA"
    const [admisionistaRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'ADMISIONISTA' LIMIT 1;`
    );
    const admisionistaRoleId = admisionistaRole[0]?.id;

    if (!admisionistaRoleId) {
      console.log('No se encontró el rol ADMISIONISTA.');
      return;
    }

    // Buscar el TypeResourceId para "ADMISIONES"
    const [admisionesTypeResource] = await queryInterface.sequelize.query(
      `SELECT id FROM "TypeResources" WHERE name = 'ADMISIONES' LIMIT 1;`
    );
    const admisionesTypeResourceId = admisionesTypeResource[0]?.id;

    if (!admisionesTypeResourceId) {
      console.log('No se encontró el tipo de recurso ADMISIONES.');
      return;
    }

    // Obtener todos los recursos del tipo "ADMISIONES"
    const resources = await queryInterface.sequelize.query(
      `SELECT id FROM "Resources" WHERE "TypeResourceId" = ${admisionesTypeResourceId} AND "isActive" = true;`
    );
    
    const resourceIds = resources[0].map(resource => resource.id);

    // Crear permisos para cada recurso
    const permissions = resourceIds.map(resourceId => ({
      RoleId: admisionistaRoleId,
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
    // Revertir la inserción de permisos para el rol ADMISIONISTA
    const [admisionistaRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'ADMISIONISTA' LIMIT 1;`
    );
    const admisionistaRoleId = admisionistaRole[0]?.id;

    if (admisionistaRoleId) {
      await queryInterface.bulkDelete('Permissions', { RoleId: admisionistaRoleId });
    }
  }
};
