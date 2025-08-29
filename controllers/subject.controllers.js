const { Subject } = require('../models');

// CREATE: Создание нового subject
exports.createSubject = async (req, res) => {
	try {
		// req.body содержит данные { name: 'Имя', birth_year: 1900 }
		const subject = await Subject.create(req.body);
		res.status(201).json(subject); // 201 Created
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при создании subject', error: error.message });
	}
};

// READ: Получение всех subject
exports.getAllSubject = async (req, res) => {
	try {
		const subjects = await Subject.findAll();
		res.status(200).json(subjects);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении subjects', error: error.message });
	}
};

// READ: Получение одного subject по ID
exports.getSubjectById = async (req, res) => {
	try {
		const subject = await Subject.findByPk(req.params.id);
		if (!subject) {
			return res.status(404).json({ message: 'Subject не найден' });
		}
		res.status(200).json(subject);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении subject', error: error.message });
	}
};

// UPDATE: Обновление subject по ID
exports.updateSubject = async (req, res) => {
	try {
		const [updated] = await Subject.update(req.body, {
			where: { id: req.params.id }
		});
		if (updated) {
			const updatedSubject = await Subject.findByPk(req.params.id);
			res.status(200).json(updatedSubject);
		} else {
			res.status(404).json({ message: 'Subject не найден' });
		}
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при обновлении subject', error: error.message });
	}
};

// DELETE: Удаление автора по ID
exports.deleteSubject = async (req, res) => {
	try {
		const deleted = await Subject.destroy({
			where: { id: req.params.id }
		});
		if (deleted) {
		res.status(204).send(); // 204 No Content
		} else {
			res.status(404).json({ message: 'Subject не найден' });
		}
	} 
	catch (error) {
			res.status(500).json({ message: 'Ошибка при удалении subject', error: error.message });
	}
};