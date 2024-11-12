'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const services = [
      { name: "Urgencia", code: "URG" },
      { name: "Hospitalizacion", code: "HOS" },
      { name: "Uci", code: "UCI" },
      { name: "Cirugia", code: "CIR" },
      { name: "consulta externa 1er Nivel", code: "CON" },
      { name: "Medicina general", code: "MED" },
      { name: "Laboratorios", code: "LAB" },
      { name: "Odontologia", code: "ODO" },
      { name: "Programas", code: "PRO" },
      { name: "Adulto Joven", code: "ADJ" },
      { name: "Crecimiento y desarrollo", code: "CDD" },
      { name: "Planificacion familiar", code: "PF" },
      { name: "Control prenatal", code: "CP" },
      { name: "Adulto Mayor", code: "AM" },
      { name: "Agudeza vizual", code: "AGU" },
      { name: "Higiene oral", code: "HIG" }
    ];

    for (const service of services) {
      await queryInterface.bulkUpdate(
        'TypeServices',
        { code: service.code },
        { name: service.name.toUpperCase() }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkUpdate(
      'TypeServices',
      { code: null },
      { code: { [Sequelize.Op.not]: null } }
    );
  }
};
