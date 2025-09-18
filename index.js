require("dotenv").config();
const express = require("express");
const path = require("path");
const { sequelize } = require("./models"); // Sequelize инстанс импортируется из папки models
const app = express();

app.use(express.json()); // для парсинга application/json
app.use(express.urlencoded({ extended: true })); // для парсинга application/x-www-form-urlencoded

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, "frontend")));

// Главное меню (стартовая страница)
app.get("/", (req, res) => {
  res.send(`
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="./styles/styles.css">
      <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="./favicon_io/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="./favicon_io/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="./favicon_io/favicon-16x16.png"
    />
    <link rel="manifest" href="/site.webmanifest" />
      <style>
        ul {
          margin: 50px;
          line-height: 1.5;
          font-size: 1.2em;
          font-family: cursive;
        }

        li {
          width: fit-content;
          transition: border-bottom 1s;
          border-bottom: 1px solid transparent;
        }

        li:hover {
          border-bottom: 1px solid currentColor;
        }
      </style>
    </head>
    <body>      
      <h1>Management of "Family to-do list"</h1>
      <ul>
        <li><a href="/tasks.html">Управление задачами</a></li>
        <li><a href="/registration.html">Регистрация</a></li>
        <li><a href="/admin.html">Admin page</a></li>
      </ul>    
    </body>
  `);
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API для управления задачами работает!");
});

const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

const scheduleRoutes = require("./routes/schedule.routes");
app.use("/api/schedule", scheduleRoutes);

const instituteRoutes = require("./routes/institute.routes");
app.use("/api/institutes", instituteRoutes);

const performerRoutes = require("./routes/performer.routes");
app.use("/api/performers", performerRoutes);

const subjectRoutes = require("./routes/subject.routes");
app.use("/api/subjects", subjectRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/api/tasks", taskRoutes);

app.listen(PORT, async () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Подключение к базе данных успешно установлено.");
  } catch (error) {
    console.error("Не удалось подключиться к базе данных:", error);
  }
});
