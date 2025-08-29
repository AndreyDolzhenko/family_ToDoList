const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/institute.controllers');

router.post('/', instituteController.createInstitute);
router.get('/', instituteController.getAllInstitute);
router.get('/:id', instituteController.getInstituteById);
router.put('/:id', instituteController.updateInstitute);
router.delete('/:id', instituteController.deleteInstitute);

module.exports = router;