const { Schedule } = require("../models");
const { User } = require("../models");
const fs = require('fs');
const path = require('path');


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('family_ToDoList_db', 'family_ToDoList_user', 'ftdlu', {
  host: 'localhost',
  dialect: 'postgres'
});

async function getTableNames() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Получить все таблицы
    const tables = await sequelize.getQueryInterface().showAllTables();
    
    console.log('Table names:', tables);
    return tables;
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

// READ: Получение всех TableNames
exports.getAllTableNames = async (req, res) => {
  try {
    const tableNames = await getTableNames();
    res.status(200).json(tableNames);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении schedule", error: error.message });
  }
};

const createBackupFile = (table, name) => {
    // Создаем папку backup, если она не существует
    const backupDir = path.join(__dirname, "../backup");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Формируем имя файла с timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${name}-backup-${timestamp}.json`;
    const filePath = path.join(backupDir, filename);

    // Сохраняем данные в JSON файл
    const backupData = {
      timestamp: new Date().toISOString(),
      count: table.length,
      data: table,
    };

    // res.status(200).json(name);
    fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2), "utf8");

    console.log(`Backup сохранен: ${filePath}`);

    return name;
};

// READ: Backup всех schedule
exports.getBackupSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findAll();

    res.status(200).json(createBackupFile(schedule, "schedule"));

  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении schedule", error: error.message });
  }
};

// READ: Backup всех User
exports.getBackupUser = async (req, res) => {
  try {
    const user = await User.findAll();

    res.status(200).json(createBackupFile(user, "user"));

  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении user", error: error.message });
  }
};