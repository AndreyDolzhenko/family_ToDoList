const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controllers');

router.post('/', subjectController.createSubject);
router.get('/', subjectController.getAllSubject);
router.get('/:id', subjectController.getSubjectById);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;