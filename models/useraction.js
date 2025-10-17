"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserAction extends Model {
    static associate(models) {
      // Связи могут быть добавлены позже при необходимости
    }
  }

  UserAction.init(
    {
      sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actionType: {
        type: DataTypes.ENUM(
          "PAGE_VIEW",
          "CREATE",
          "READ",
          "UPDATE",
          "DELETE",
          "SEARCH",
          "CLICK",
          "FORM_SUBMIT"
        ),
        allowNull: false,
      },
      entityType: {
        type: DataTypes.ENUM("User", "Schedule", "Task"),
        allowNull: true,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      elementId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      searchQuery: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userAgent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserAction",
    }
  );

  return UserAction;
};