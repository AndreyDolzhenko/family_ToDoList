const { Task } = require('../models');

// CREATE: Создание нового task
exports.createTask = async (req, res) => {
	try {
		// req.body содержит данные { name: 'Имя', birth_year: 1900 }
		const task = await Task.create(req.body);
		res.status(201).json(task); // 201 Created
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при создании task', error: error.message });
	}
};

// READ: Получение всех task
exports.getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.findAll();
		res.status(200).json(tasks);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении tasks', error: error.message });
	}
};

// READ: Получение одного task по ID
exports.getTaskById = async (req, res) => {
	try {
		const task = await Task.findByPk(req.params.id);
		if (!task) {
			return res.status(404).json({ message: 'Task не найден' });
		}
		res.status(200).json(task);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении task', error: error.message });
	}
};

// UPDATE: Обновление task по ID
exports.updateTask = async (req, res) => {
	try {
		const [updated] = await Task.update(req.body, {
			where: { id: req.params.id }
		});
		if (updated) {
			const updatedTask = await Task.findByPk(req.params.id);
			res.status(200).json(updatedTask);
		} else {
			res.status(404).json({ message: 'Task не найден' });
		}
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при обновлении task', error: error.message });
	}
};

// DELETE: Удаление автора по ID
exports.deleteTask = async (req, res) => {
	try {
		const deleted = await Task.destroy({
			where: { id: req.params.id }
		});
		if (deleted) {
		res.status(204).send(); // 204 No Content
		} else {
			res.status(404).json({ message: 'Task не найден' });
		}
	} 
	catch (error) {
			res.status(500).json({ message: 'Ошибка при удалении task', error: error.message });
	}
};