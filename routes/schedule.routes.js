const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controllers');

router.post('/', scheduleController.createSchedule);
router.get('/', scheduleController.getAllSchedule);
router.get('/:user_id', scheduleController.getScheduleByUserId);
router.put('/:name', scheduleController.updateSchedule);
router.delete('/:name', scheduleController.deleteSchedule);

module.exports = router;
