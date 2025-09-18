const { Schedule } = require('../models');

// CREATE: Создание нового schedule
exports.createSchedule = async (req, res) => {
	try {
		// req.body содержит данные { name: 'Имя', birth_year: 1900 }
		const schedule = await Schedule.create(req.body);
		console.log("!!!!req.body = ", req.body);
		res.status(201).json(schedule); // 201 Created
	} 
	catch (error) {
		console.log("ERROR !!!!schedule = ", error);
		res.status(500).json({ message: 'Ошибка при создании schedule', error: error.message });
	}
};

// READ: Получение всех schedule
exports.getAllSchedule = async (req, res) => {
	try {
		const schedule = await Schedule.findAll();
		res.status(200).json(schedule);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении schedule', error: error.message });
	}
};

// READ: Получение одного schedule по ID
exports.getScheduleById = async (req, res) => {
	try {
		const schedule = await Schedule.findOne({ where: { name: req.params.name } });
		console.log("req.params.name - ", req.params.name);
		console.log("schedule - ", schedule);
		if (!schedule) {
			return res.status(404).json({ message: 'Schedule не найден' });
		}
		res.status(200).json(schedule);
	} 
	catch (error) {
		res.status(500).json({ message: 'Ошибка при получении schedule', error: error.message });
	}
};

// UPDATE: Обновление schedule по ID
exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ 
      where: { name: req.params.name } 
    });
    
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule не найден' });
    }
    
    // Обновляем и сразу возвращаем обновленную запись
    const updatedSchedule = await schedule.update(req.body);
    res.status(200).json(updatedSchedule);
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Ошибка при обновлении Schedule', 
      error: error.message 
    });
  }
};

// DELETE: Удаление автора по ID
exports.deleteSchedule = async (req, res) => {
	try {
		const deleted = await Schedule.destroy({
			where: { id: req.params.id }
		});
		if (deleted) {
		res.status(204).send(); // 204 No Content
		} else {
			res.status(404).json({ message: 'Schedule не найден' });
		}
	} 
	catch (error) {
			res.status(500).json({ message: 'Ошибка при удалении schedule', error: error.message });
	}
};