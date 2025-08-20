require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models"); // Sequelize инстанс импортируется из папки models
const app = express();
const PORT = process.env.PORT || 3000;
 
app.get("/", (req, res) => {
  res.send("API для управления задачами работает!");
});
 
app.listen(PORT, async () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Подключение к базе данных успешно установлено.");
  } catch (error) {
    console.error("Не удалось подключиться к базе данных:", error);
  }
});