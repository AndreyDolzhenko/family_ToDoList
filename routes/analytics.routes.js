const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");

// Получить общую статистику
router.get("/stats", analyticsController.getOverallStats);

// Получить популярные страницы
router.get("/popular-pages", analyticsController.getPopularPages);

// Получить статистику по сущностям
router.get("/entity-stats", analyticsController.getEntityStats);

// Получить активность по времени
router.get("/time-stats", analyticsController.getTimeStats);

// Получить статистику сессий
router.get("/session-stats", analyticsController.getSessionStats);

// Логирование клиентских действий
router.post("/log", analyticsController.logClientAction);

module.exports = router;