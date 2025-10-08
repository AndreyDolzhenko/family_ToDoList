'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    // Сначала удаляем таблицы с внешними ключами
    await queryInterface.dropTable('UserInstitutes');
    await queryInterface.dropTable('UserSubjects');
    
    // Затем основные таблицы
    await queryInterface.dropTable('Institutes');
    await queryInterface.dropTable('Performers');
    // добавьте другие таблицы по необходимости
  
  }
};
