'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const [admin] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE username = 'admin' LIMIT 1;`
    );

    
    const [surgeryLiquidation] = await queryInterface.bulkInsert('SurgeryLiquidations', [
      {
        name: 'MULTIPLE ESPECIALISTA DIFERENTE VIA DE ACCESO',
        active: true,
        UserId: admin[0].id, // Cambia este valor según corresponda
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });


    const [cirujano]= await queryInterface.sequelize.query(`SELECT id FROM "Services" WHERE name = 'CIRUJANO' LIMIT 1;`)
    const [anestesiologo]= await queryInterface.sequelize.query(`SELECT id FROM "Services" WHERE name = 'ANESTESIOLOGO' LIMIT 1;`)
    const [ayudante]= await queryInterface.sequelize.query(`SELECT id FROM "Services" WHERE name = 'AYUDANTE QUIRURGICO' LIMIT 1;`)
    const [derechos]= await queryInterface.sequelize.query(`SELECT id FROM "Services" WHERE name = 'DERECHOS DE SALA DE QUIROFANO' LIMIT 1;`)
    const [materiales]= await queryInterface.sequelize.query(`SELECT id FROM "Services" WHERE name = 'MATERIALES' LIMIT 1;`)
    const serviceId = {
      cirujano, anestesiologo, ayudante, derechos, materiales
    };


    const [iss2001]=  await queryInterface.sequelize.query(`SELECT id FROM "ManualTypes" WHERE name = 'ISS 2001' LIMIT 1;`)
    const [iss2004]=  await queryInterface.sequelize.query(`SELECT id FROM "ManualTypes" WHERE name = 'ISS 2004' LIMIT 1;`)
    const [soat]=  await queryInterface.sequelize.query(`SELECT id FROM "ManualTypes" WHERE name = 'SOAT' LIMIT 1;`)

    const manualTypes = {
      iss2001, iss2004, soat
    };

    // Definir los datos a insertar
    const liquidationTypes = [

      //CIRUJANO A

      // CIRUJANO
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 60 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },
      
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },
      
      
      // ANESTESIOLOGO
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },

      // AYUDANTE QUIRURGICO
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 0 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 0 },

      // Derechos de sala de quirófano
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },

      // Materiales
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 1, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 2, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO A', No: 3, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },
      
      //CIRUJANO B

      // CIRUJANO
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 60 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },
      
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.cirujano[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },
      
      
      // ANESTESIOLOGO
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 75 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.anestesiologo[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },

      // AYUDANTE QUIRURGICO
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 0 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.ayudante[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 0 },

      // Derechos de sala de quirófano
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 40 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.derechos[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 50 },

      // Materiales
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2001[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 100 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 50 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.iss2004[0].id, percentage: 0 },

      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 1, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 2, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },
      { SurgeryLiquidationId: surgeryLiquidation.id, name: 'CIRUJANO B', No: 3, ServiceId: serviceId.materiales[0].id, ManualTypeId: manualTypes.soat[0].id, percentage: 75 },

    ];  

    // Insertar los datos usando un bucle
    await queryInterface.bulkInsert('LiquidationTypes', liquidationTypes.map(type => {
      return{
        name: type.name,
        SurgeryLiquidationId: type.SurgeryLiquidationId,
        No: type.No,
        ServiceId: type.ServiceId,
        ManualTypeId: type.ManualTypeId,
        percentage: type.percentage,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }) );
    
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar los registros creados en el seeder
    await queryInterface.bulkDelete('LiquidationTypes', null, {});
    await queryInterface.bulkDelete('SurgeryLiquidations', { name: 'LIQUIDACION CIRUGIAS SALUD' }, {});
  }
};
