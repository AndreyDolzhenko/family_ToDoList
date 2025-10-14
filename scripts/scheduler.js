const cron = require("node-cron");
const { backupUsers } = require("./backup-users");

// Запуск каждый день в 6:00
cron.schedule("0 12 * * *", async () => {
  console.log(`[${new Date().toISOString()}] Starting scheduled backup...`);
  await backupUsers();
});

console.log("Backup scheduler started. Will run daily at 12:00 AM");

// Для PM2 нужно оставить процесс запущенным
setInterval(() => {
  // Просто держим процесс alive
}, 24 * 60 * 60 * 1000); // 24 часа