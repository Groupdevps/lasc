'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('NoteTypes', [
      {
        name: 'NOTA MEDICA',
        description: 'Nota relacionada con observaciones o detalles de atencion medica.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'EVOLUCION MEDICA',
        description: 'Registro de la evolucion en la condicion medica del paciente.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'NOTA DE ENFERMERIA',
        description: 'Observaciones y cuidados registrados por el personal de enfermeria.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'EVOLUCION DE CIRUGIA',
        description: 'Detalles y seguimiento de la evolucion posquirurgica del paciente.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'EVOLUCION DE ANESTESIA',
        description: 'Notas sobre el seguimiento de anestesia en el paciente.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'EVOLUCION DE RECUPERACION',
        description: 'Observaciones de recuperacion y cuidados posteriores a la cirugia o procedimiento.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('NoteTypes', null, {});
  }
};
