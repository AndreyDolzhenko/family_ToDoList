'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("PerformerTasks", {
      performer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "Performers", key: "id" },
        onDelete: "CASCADE",
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "Tasks", key: "id" },
        onDelete: "CASCADE",
      },
    });
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
