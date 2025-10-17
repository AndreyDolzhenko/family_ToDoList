const { UserAction, sequelize } = require("../models");
const { Op } = require("sequelize");

// Получить общую статистику действий
async function getOverallStats(req, res) {
  try {
    const stats = await UserAction.findAll({
      attributes: [
        "actionType",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      group: ["actionType"],
      order: [[sequelize.fn("COUNT", sequelize.col("id")), "DESC"]],
    });

    res.json(stats);
  } catch (error) {
    console.error("Ошибка при получении статистики:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

// Получить популярные страницы
async function getPopularPages(req, res) {
  try {
    const pages = await UserAction.findAll({
      attributes: [
        "pageUrl",
        [sequelize.fn("COUNT", sequelize.col("id")), "visitCount"],
      ],
      where: {
        actionType: "READ",
      },
      group: ["pageUrl"],
      order: [[sequelize.fn("COUNT", sequelize.col("id")), "DESC"]],
      limit: 10,
    });

    res.json(pages);
  } catch (error) {
    console.error("Ошибка при получении популярных страниц:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

// Получить статистику по сущностям
async function getEntityStats(req, res) {
  try {
    const entityStats = await UserAction.findAll({
      attributes: [
        "entityType",
        "entityId",
        [sequelize.fn("COUNT", sequelize.col("id")), "interactionCount"],
      ],
      where: {
        entityType: {
          [Op.not]: null,
        },
        entityId: {
          [Op.not]: null,
        },
      },
      group: ["entityType", "entityId"],
      order: [[sequelize.fn("COUNT", sequelize.col("id")), "DESC"]],
      limit: 20,
    });

    res.json(entityStats);
  } catch (error) {
    console.error("Ошибка при получении статистики сущностей:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

// Получить активность по времени
async function getTimeStats(req, res) {
  try {
    const timeStats = await UserAction.findAll({
      attributes: [
        [
          sequelize.fn("DATE_TRUNC", "hour", sequelize.col("createdAt")),
          "hour",
        ],
        [sequelize.fn("COUNT", sequelize.col("id")), "activityCount"],
      ],
      group: [sequelize.fn("DATE_TRUNC", "hour", sequelize.col("createdAt"))],
      order: [
        [sequelize.fn("DATE_TRUNC", "hour", sequelize.col("createdAt")), "ASC"],
      ],
    });

    res.json(timeStats);
  } catch (error) {
    console.error("Ошибка при получении временной статистики:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

// Получить уникальные сессии
async function getSessionStats(req, res) {
  try {
    const sessionStats = await UserAction.findAll({
      attributes: [
        "sessionId",
        [sequelize.fn("COUNT", sequelize.col("id")), "actionCount"],
        [sequelize.fn("MIN", sequelize.col("createdAt")), "firstAction"],
        [sequelize.fn("MAX", sequelize.col("createdAt")), "lastAction"],
      ],
      group: ["sessionId"],
      order: [[sequelize.fn("COUNT", sequelize.col("id")), "DESC"]],
      limit: 10,
    });

    res.json(sessionStats);
  } catch (error) {
    console.error("Ошибка при получении статистики сессий:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

// Логирование клиентских действий (для AJAX запросов)
async function logClientAction(req, res) {
  try {
    const {
      actionType,
      entityType,
      entityId,
      pageUrl,
      elementId,
      searchQuery,
      duration,
    } = req.body;

    const sessionId = req.headers["x-session-id"] || require("uuid").v4();

    await UserAction.create({
      sessionId,
      actionType,
      entityType,
      entityId,
      pageUrl,
      elementId,
      searchQuery,
      duration,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip || req.connection.remoteAddress,
      metadata: req.body.metadata || {},
    });

    res.json({ success: true, sessionId });
  } catch (error) {
    console.error("Ошибка при логировании клиентского действия:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

module.exports = {
  getOverallStats,
  getPopularPages,
  getEntityStats,
  getTimeStats,
  getSessionStats,
  logClientAction,
};