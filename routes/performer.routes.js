const express = require('express');
const router = express.Router();
const performerController = require('../controllers/performer.controllers');

router.post('/', performerController.createPerformer);
router.get('/', performerController.getAllPerformers);
router.get('/:id', performerController.getPerformerById);
router.put('/:id', performerController.updatePerformer);
router.delete('/:id', performerController.deletePerformer);

module.exports = router;