const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backup.controllers');


router.get('/tables', backupController.getAllTableNames);
router.get('/schedule', backupController.getBackupSchedule);
router.get('/users', backupController.getBackupUser);

module.exports = router;