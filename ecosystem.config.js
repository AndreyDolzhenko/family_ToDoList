module.exports = {
  apps: [
    {
      name: "backup-scheduler",
      script: "./scripts/scheduler.js",
      cron_restart: "0 6 * * *",
      autorestart: false,
      watch: false,
    }
  ]
};