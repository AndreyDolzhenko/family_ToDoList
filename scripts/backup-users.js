// scripts/backup-users.js
"use strict";

const fs = require("fs/promises");
const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");

// Правильные пути при размещении в scripts/
const configPath = path.resolve(__dirname, "..", "config", "config.json");
const { config } = require(configPath);

async function backupUsers() {
  try {
    const sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      logging: false,
    });

    const users = await sequelize.query("SELECT * FROM Users", {
      type: QueryTypes.SELECT,
    });

    // Папка backups на уровень выше scripts/
    const backupDir = path.resolve(__dirname, "..", "backups");
    await fs.mkdir(backupDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const backupFileName = `users-backup-${timestamp}.json`;
    const backupPath = path.join(backupDir, backupFileName);

    const backupData = {
      timestamp: new Date().toISOString(),
      table: "Users",
      data: users,
    };

    await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2));
    console.log(`Backup created: ${backupPath}`);

    await sequelize.close();
    await cleanupOldBackups(backupDir);

  } catch (error) {
    console.error("Backup failed:", error);
    process.exit(1);
  }
}

async function cleanupOldBackups(backupDir) {
  // ... код очистки старых бэкапов
}

if (require.main === module) {
  backupUsers();
}

module.exports = { backupUsers };
