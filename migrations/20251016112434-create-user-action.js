'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("UserActions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sessionId: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Уникальный идентификатор сессии пользователя",
      },
      actionType: {
        type: Sequelize.ENUM(
          "PAGE_VIEW", // Просмотр страницы
          "CREATE", // Создание записи
          "READ", // Чтение записи
          "UPDATE", // Обновление записи
          "DELETE", // Удаление записи
          "SEARCH", // Поиск
          "CLICK", // Клик по элементу
          "FORM_SUBMIT" // Отправка формы
        ),
        allowNull: false,
      },
      entityType: {
        type: Sequelize.ENUM("AUTHOR", "BOOK", "GENRE", "PAGE"),
        allowNull: true,
        comment: "Тип сущности, с которой взаимодействовал пользователь",
      },
      entityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "ID конкретной записи (автора, книги, жанра)",
      },
      pageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "URL страницы, на которой произошло действие",
      },
      elementId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "ID элемента, на который кликнули",
      },
      searchQuery: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Поисковый запрос (если действие - поиск)",
      },
      userAgent: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Информация о браузере пользователя",
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "IP адрес пользователя",
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment:
          'Время в миллисекундах (для действий типа "время на странице")',
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: "Дополнительные данные в формате JSON",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Добавляем индексы для быстрого поиска
    await queryInterface.addIndex("UserActions", ["sessionId"]);
    await queryInterface.addIndex("UserActions", ["actionType"]);
    await queryInterface.addIndex("UserActions", ["entityType", "entityId"]);
    await queryInterface.addIndex("UserActions", ["createdAt"]);
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable("UserActions");
  }
};
