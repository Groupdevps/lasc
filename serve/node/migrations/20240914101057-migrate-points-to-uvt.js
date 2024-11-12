'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `UPDATE "TariffManuals"
       SET "uvt" = CASE
         WHEN "points" ~ '^[0-9]*\\.?[0-9]+$' THEN CAST("points" AS FLOAT)
         ELSE NULL
       END;`
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
