"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.Task, { foreignKey: 'task_id' });
      // User.belongsToMany(models.Subjects, { foreignKey: 'subject_id' });
      // User.belongsToMany(models.Institutes, { foreignKey: 'institute_id' });
    }
  }
  Schedule.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "Schedule", // или другое имя, которое существует в БД
      timestamps: true,
    }
  );
  return Schedule;
};
