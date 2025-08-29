const { Performer } = require('../models');

// CREATE: Создание нового performer
exports.createPerformer = async (req, res) => {
	try {
		// req.body содержит данные { name: 'Имя', birth_year: 1900 }
		const performer = await Performer.create(req.body);
		res.status(201).json(performer); // 201 Created
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при создании performer', error: error.message });
	}
};

// READ: Получение всех performer
exports.getAllPerformers = async (req, res) => {
	try {
		const performers = await Performer.findAll();
		res.status(200).json(performers);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении performers', error: error.message });
	}
};

// READ: Получение одного performer по ID
exports.getPerformerById = async (req, res) => {
	try {
		const performer = await Performer.findByPk(req.params.id);
		if (!performer) {
			return res.status(404).json({ message: 'Performer не найден' });
		}
		res.status(200).json(performer);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении performer', error: error.message });
	}
};

// UPDATE: Обновление performer по ID
exports.updatePerformer = async (req, res) => {
	try {
		const [updated] = await Performer.update(req.body, {
			where: { id: req.params.id }
		});
		if (updated) {
			const updatedPerformer = await Performer.findByPk(req.params.id);
			res.status(200).json(updatedPerformer);
		} else {
			res.status(404).json({ message: 'Performer не найден' });
		}
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при обновлении performer', error: error.message });
	}
};

// DELETE: Удаление автора по ID
exports.deletePerformer = async (req, res) => {
	try {
		const deleted = await Performer.destroy({
			where: { id: req.params.id }
		});
		if (deleted) {
		res.status(204).send(); // 204 No Content
		} else {
			res.status(404).json({ message: 'Performer не найден' });
		}
	} 
	catch (error) {
			res.status(500).json({ message: 'Ошибка при удалении performer', error: error.message });
	}
};