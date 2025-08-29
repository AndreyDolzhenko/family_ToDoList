const { Institute } = require('../models');

// CREATE: Создание нового institute
exports.createInstitute = async (req, res) => {
	try {
		// req.body содержит данные { name: 'Имя', birth_year: 1900 }
		const institute = await Institute.create(req.body);
		res.status(201).json(institute); // 201 Created
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при создании institute', error: error.message });
	}
};

// READ: Получение всех institute
exports.getAllInstitute = async (req, res) => {
	try {
		const institutes = await Institute.findAll();
		res.status(200).json(institutes);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении institutes', error: error.message });
	}
};

// READ: Получение одного institute по ID
exports.getInstituteById = async (req, res) => {
	try {
		const institute = await Institute.findByPk(req.params.id);
		if (!institute) {
			return res.status(404).json({ message: 'Institute не найден' });
		}
		res.status(200).json(institute);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении institute', error: error.message });
	}
};

// UPDATE: Обновление institute по ID
exports.updateInstitute = async (req, res) => {
	try {
		const [updated] = await Institute.update(req.body, {
			where: { id: req.params.id }
		});
		if (updated) {
			const updatedInstitute = await Institute.findByPk(req.params.id);
			res.status(200).json(updatedInstitute);
		} else {
			res.status(404).json({ message: 'Institute не найден' });
		}
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при обновлении institute', error: error.message });
	}
};

// DELETE: Удаление автора по ID
exports.deleteInstitute = async (req, res) => {
	try {
		const deleted = await Institute.destroy({
			where: { id: req.params.id }
		});
		if (deleted) {
		res.status(204).send(); // 204 No Content
		} else {
			res.status(404).json({ message: 'Institute не найден' });
		}
	} 
	catch (error) {
			res.status(500).json({ message: 'Ошибка при удалении institute', error: error.message });
	}
};