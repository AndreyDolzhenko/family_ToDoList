const { User } = require("../models");

// CREATE: Создание нового user
exports.createUser = async (req, res) => {
  try {
    // req.body содержит данные { name: 'Имя', birth_year: 1900 }
    const user = await User.create(req.body);
    res.status(201).json(user); // 201 Created
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при создании user", error: error.message });
  }
};

// READ: Получение всех user
exports.getAllUsers = async (req, res) => {
  try {
    // console.log("????? ", req.params.name);
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении users", error: error.message });
  }
};

// READ: Получение одного user по ID
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     console.log("!!!??? ", req.params.name);
//     if (!user) {
//       return res.status(404).json({ message: "User не найден" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Ошибка при получении user", error: error.message });
//   }
// };

// READ: Получение одного user по Name
exports.getUserByName = async (req, res) => {
	try {	  
    const user = await User.findOne({
      where: {
        name: req.params.name,
      },
    }); 

    if (!user) {
      return res.status(404).json({ message: "User не найден" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении user", error: error.message });
  }
};

// UPDATE: Обновление user по ID
exports.updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User не найден" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при обновлении user", error: error.message });
  }
};

// DELETE: Удаление автора по ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ message: "User не найден" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при удалении user", error: error.message });
  }
};
