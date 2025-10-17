const { UserAction } = require("../models");
const { v4: uuidv4 } = require("uuid");

// Генерируем или получаем session ID
function getSessionId(req) {
  // В реальном приложении можно использовать cookies или JWT токены
  if (!req.headers["x-session-id"]) {
    return uuidv4();
  }
  return req.headers["x-session-id"];
}

// Определяем тип действия по HTTP методу и URL
function getActionType(method, url) {
  if (method === "GET") {
    return "READ";
  } else if (method === "POST") {
    return "CREATE";
  } else if (method === "PUT" || method === "PATCH") {
    return "UPDATE";
  } else if (method === "DELETE") {
    return "DELETE";
  }
  return "READ";
}

// Определяем тип сущности по URL
function getEntityType(url) {
  if (url.includes("/users")) return "USER";
  if (url.includes("/schedule")) return "SCHEDULES";
  if (url.includes("/task")) return "TASK";
  return "PAGE";
}

// Извлекаем ID сущности из URL
function getEntityId(url) {
  const match = url.match(/\/(\d+)$/);
  return match ? parseInt(match[1]) : null;
}

// Middleware для логирования действий
async function logUserAction(req, res, next) {
  try {
    const sessionId = getSessionId(req);
    const actionType = getActionType(req.method, req.url);
    const entityType = getEntityType(req.url);
    const entityId = getEntityId(req.url);

    // Логируем действие
    await UserAction.create({
      sessionId,
      actionType,
      entityType,
      entityId,
      pageUrl: req.url,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip || req.connection.remoteAddress,
      metadata: {
        method: req.method,
        query: req.query,
        timestamp: new Date().toISOString(),
      },
    });

    // Передаем sessionId в ответ для клиента
    res.setHeader("X-Session-Id", sessionId);

    next();
  } catch (error) {
    // Логирование не должно ломать основной функционал
    console.error("Ошибка при логировании действия:", error);
    next();
  }
}

module.exports = { logUserAction, getSessionId };