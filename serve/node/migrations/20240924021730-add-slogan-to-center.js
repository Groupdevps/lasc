'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Centers', 'slogan', {
            type: Sequelize.TEXT
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Centers', 'slogan');
    }
};
