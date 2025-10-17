const choiceOfWorkplace = document.getElementsByClassName("choiceOfWorkplace");
const workPlace = document.getElementsByClassName("workPlace");
const allTd = document.querySelectorAll("td");
const autho = document.getElementById("autho");
const authoClick = document.getElementById("authoClick");
const wellcome = document.getElementById("wellcome");
const tasksTop = document.getElementById("tasksTop");
const scheduleTop = document.getElementById("scheduleTop");
const scheduleDescription = document.getElementById("scheduleDescription");
const tasksDescription = document.getElementById("tasksDescription");
const addTask = document.getElementById("addTask");
const executeTask = document.getElementById("executeTask");
const listAllTasks = document.getElementById("listAllTasks");
const buttonOfTasks = document.getElementsByClassName("buttonOfTasks");
const footer = document.querySelector("footer");
const enterName = document.getElementById("enterName");
const enterPass = document.getElementById("enterPass");

let curentUserId = 0;

scheduleTop.addEventListener("click", async (event) => {
  const user_name = enterName.value;
  const pass = enterPass.value;

  const user_result = await fetch(`/api/users/${user_name}`);
  const user_data = await user_result.json();

  if (pass == user_data.password && user_name == user_data.name) {
    scheduleManagment();
    createYearPlane();
    getAllSchedule();

    // console.log("password", user_data.name, user_data.password);
  } else {
    alert("Неверный логин или пароль!");
  }
});
tasksTop.addEventListener("click", (event) => tasksManagment());

addTask.addEventListener("click", (event) => taskTableCreate());
// executeTask.addEventListener("click", (event) => taskRecording());

// Получение всех пунктов расписания

const getAllSchedule = async () => {
  try {
    let user_name;
    enterName.value != ""
      ? (user_name = enterName.value)
      : (user_name = "user_name");
    const user_result = await fetch(`/api/users/${user_name}`);
    const user_data = await user_result.json();
    const user_id = user_data.id;

    const result = await fetch(`/api/schedule/${user_id}`);
    const data = await result.json();

    data.forEach((el) => {
      const searchCell = document.getElementById(el.name);
      if (
        searchCell &&
        searchCell.lastChild &&
        searchCell.lastChild.nodeType === 1
      ) {
        searchCell.lastChild.textContent = el.content;
      }
    });
  } catch (error) {
    console.error("Error fetching schedule:", error);
  }
};

// Получение расписания по name

const getScheduleByName = async (name) => {
  const result = await fetch(`/api/schedule/${name}`);
  const data = await result.json();
  const id = data.id;
};

// Запись нового значения в расписании по name

const updateScheduleByName = async (name, content, user_name) => {
  const all_schedules = await fetch("/api/schedule");
  const all_schedules_result = await all_schedules.json();

  const includesResult = all_schedules_result.map((obj) => obj.name);

  const result = await fetch(`/api/users/${user_name}`);
  const data = await result.json();
  const user_id = data.id;

  switch (includesResult.includes(name)) {
    case true:
      await fetch(`/api/schedule/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, user_id, content }),
      });

      break;

    case false:
      await fetch(`/api/schedule/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, user_id, content }),
      });

      break;

    default:
      break;
  }
};

// Формирование календаря на год

const createYearPlane = () => {
  scheduleDescription.textContent = "";
  const currentYearCalenderTable = currentYearCalender(2, 2025);
  let div = document.createElement("div");

  const calendar = document.getElementById("calendar");

  let scoreMonth = [0];
  let level = 0;
  currentYearCalenderTable[1].forEach((el) => {
    level += el.days;
    scoreMonth.push(level);
  });

  if (calendar.textContent == "") {
    currentYearCalenderTable[0].map((el, index) => {
      if (scoreMonth.includes(index) == true) {
        const br = document.createElement("br");
        calendar.append(br);
        const br1 = document.createElement("br");
        const span = document.createElement("span");
        span.textContent = ` ${el[2]}  `;
        span.style = "color: darkcyan; text-transform: uppercase;";
        calendar.append(span);
        calendar.append(br1);
      }

      const span = document.createElement("span");
      span.textContent = ` | ${el[1]} ${el[0]} | `;
      if (el[0] == "Sat" || el[0] == "Sun") {
        span.style.color = "brown";
        calendar.append(span);
      }

      if (el[0] == "Mon") {
        calendar.append(span);
        const br = document.createElement("br");
        calendar.append(br);
      }

      calendar.append(span);
    });
  }

  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const table = document.createElement("table");
  table.style.margin = "0";

  for (let index = 7; index <= 20; index++) {
    const tr = document.createElement("tr");

    week.map((el) => {
      const td = document.createElement("td");
      td.style.width = `var(--tdWith)`;
      td.style.height = "20px";

      td.className = "scheduleCell";
      td.id = el + index;

      td.addEventListener("contextmenu", (event) => {
        let name;

        event.target.parentElement.tagName == "TR"
          ? (name = event.target.id)
          : (name = event.target.parentElement.id);

        if (
          event.target.parentElement.lastChild.type != "text" &&
          event.target.lastChild.type != "text"
        ) {
          const input = document.createElement("input");
          input.type = "text";
          input.value = name;

          document.addEventListener("touchmove", (event) => {
            input.remove();
          });

          let lastTouchEnd = 0;
          document.addEventListener(
            "touchend",
            function (event) {
              var now = new Date().getTime();
              if (now - lastTouchEnd <= 300) {
                // 300ms - типичный интервал для двойного касания
                // Здесь выполняется действие для двойного касания

                let user_name;
                enterName.value != ""
                  ? (user_name = enterName.value)
                  : (user_name = "user_name");

                const content = input.value;
                document.getElementById(name).textContent = content;
                updateScheduleByName(name, content, user_name);
                input.remove();

                event.preventDefault(); // Отменяет стандартное действие браузера (например, прокрутку)
              }
              lastTouchEnd = now;
            },
            false
          );

          input.addEventListener("keyup", (event) => {
            switch (event.key) {
              case "Enter":
                const content = input.value;
                let user_name;
                enterName.value != ""
                  ? (user_name = enterName.value)
                  : (user_name = "user_name");
                document.getElementById(name).textContent = content;
                updateScheduleByName(name, content, user_name);
                input.remove();
                break;

              case "Escape":
                input.remove();
                break;

              case "":
                break;

              default:
                break;
            }
          });

          td.append(input);
        }
      });

      if (index == 7) {
        td.textContent = el;
        td.style.textAlign = "center";
      } else {
        const span = document.createElement("span");
        const span1 = document.createElement("span");
        span.textContent = `${index}:`;
        td.prepend(span);
        td.append(span1);
      }

      tr.append(td);
    });

    table.append(tr);
  }

  scheduleDescription.append(table);

  const scheduleCell = document.getElementsByClassName("scheduleCell");

  // !!! Код ниже используется ОДИН раз для формирования в базе данных пунктов расписания

  // const newArr = Array.from(scheduleCell).map((el) => el.id);

  // newArr.map(async el => {

  //   const name = el;
  //   const content = "";

  //   await fetch("/api/schedule", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name,
  //       content,
  //     }),
  //   });

  // });
};

// Запись задачи

const taskUpdate = () => {
  return choiseOfPeriod();
};

const taskRecording = async () => {
  const dataToSend = {
    name: document.getElementById("name").value,
    customer: curentUserId,
    performer: Number(document.getElementById("performer").value),
    due_date: document.getElementById("due_date").value,
    // completion_date: "0000-00-00",
  };

  const { name, customer, performer, due_date, completion_date } = dataToSend;

  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      customer,
      performer,
      due_date,
      completion_date,
    }),
  });

  getAllTasks();
};

const newTask = document;

document.addEventListener("touchmove", (event) => {
  const taskTable = document.getElementById("taskTable");
  taskTable.firstChild.remove();
});

//touch delete new case
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (event) {
    var now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      // 300ms - типичный интервал для двойного касания
      // Здесь выполняется действие для двойного касания

      taskRecording();
      const taskTable = document.getElementById("taskTable");
      taskTable.firstChild.remove();

      event.preventDefault(); // Отменяет стандартное действие браузера (например, прокрутку)
    }
    lastTouchEnd = now;
  },
  false
);

const taskTableCreate = async () => {
  const response = await fetch("/api/users"); // Pauses until fetch completes
  const data = await response.json(); // Pauses until JSON parsing completes

  const table = document.createElement("table");
  table.id = "taskTable";
  table.style = "margin: 5px 20px;";
  const tr = document.createElement("tr");
  tr.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "Escape":
        tr.remove();
        break;

      case "Enter":
        taskRecording();
        tr.remove();
        break;

      default:
        break;
    }
  });

  for (let index = 0; index <= 3; index++) {
    const td = document.createElement("td");
    td.style = "border: 0px; margin: 2px 0;";
    const input = document.createElement("input");
    const select = document.createElement("select");

    switch (index) {
      case 0:
        input.id = "name";
        input.setAttribute("required", "true");
        break;

      case 1:
        data.forEach((el) => {
          const option = document.createElement("option");
          option.value = el.id;
          // option.textContent = el.name;
          select.appendChild(option);
        });
        select.id = "performer";
        break;

      case 2:
        input.id = "due_date";
        input.type = "date";
        break;

      case 3:
        input.id = "completion_date";
        input.type = "date";
        break;

      default:
        break;
    }

    index != 1 ? td.append(input) : td.append(select);

    tr.append(td);
  }

  table.append(tr);
  tasksDescription.prepend(table);
};

const scheduleManagment = () => {
  for (let index = 0; index < allTd.length; index++) {
    allTd[index].style = "border: 1px solid var(--basicColor)";
  }

  scheduleTop.style.borderBottom = "1px solid var(--basicBG)";

  scheduleDescription.style.display = "table-cell";
  scheduleDescription.style.borderTop = "none";

  for (let index = 0; index < buttonOfTasks.length; index++) {
    buttonOfTasks[index].style.display = "none";
  }
};

const tasksManagment = () => {
  for (let index = 0; index < allTd.length; index++) {
    allTd[index].style = "border: 1px solid var(--basicColor)";
  }

  tasksTop.style.borderBottom = "1px solid var(--basicBG)";

  tasksDescription.style.display = "table-cell";

  for (let index = 0; index < buttonOfTasks.length; index++) {
    buttonOfTasks[index].style.display = "inline-block";
  }
};

const choiseOfPeriod = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  return `${year}-${month}-${day}`;

  // choiseOfYear = year;

  // const lastDayOfMonth = new Date(year, month + 1, 0);
  // let date = new Date(year, month, 1);
};

authoClick.addEventListener("click", async (event) => {
  const response = await fetch("/api/users");
  const data = await response.json();
  let nameTop = "Нет такого пользователя. Зарегистрируйтесь!";
  let found = false;

  let user_name;
  enterName.value != ""
    ? (user_name = enterName.value)
    : (user_name = "user_name");

  data.forEach((el) => {
    if (user_name === el.name) {
      curentUserId = el.id;
      nameTop = el.name;
      wellcome.innerHTML = `Добро пожаловать, ${nameTop}!`;
      found = true;
    }
  });

  if (!found) {
    wellcome.textContent = nameTop;
  }
});

const getAllTasks = async () => {
  listAllTasks.innerHTML = "";
  const response = await fetch("/api/users"); // Pauses until fetch completes
  const data = await response.json(); // Pauses until JSON parsing completes

  const allTaskList = await fetch("/api/tasks"); // Pauses until fetch completes
  const dataTasks = await allTaskList.json();

  dataTasks.map(async (el) => {
    const user = await fetch(`/api/users/${el.performer}`);
    const userData = await user.json();
    const li = document.createElement("li");
    li.id = "task" + el.id;
    li.addEventListener("contextmenu", async (event) => {
      const name = el.name;
      const customer = el.customer;
      const performer = el.performer;
      const due_date = el.due_date;
      let completion_date = "";
      if (el.completion_date != "null") {
        el.completion_date == "2000-01-01T00:00:00.000Z"
          ? (completion_date = taskUpdate())
          : (completion_date = "2000-01-01T00:00:00.000Z");
      } else {
        completion_date = "2000-01-01T00:00:00.000Z";
      }

      await fetch(`/api/tasks/${el.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          customer,
          performer,
          due_date,
          completion_date,
        }),
      });

      // Deleting task
      const deleteKey = event.target;
      document.addEventListener("keyup", async (event) => {
        if (event.key == "Delete") {
          const trueDelete = confirm(
            `Are you sure DELETE? ${deleteKey.innerText}`
          );
          if (trueDelete == true) {
            await fetch(`/api/tasks/${el.id}`, { method: "DELETE" });

            deleteKey.remove();
          }
        }
        return;
      });

      if (li.lastChild.tagName != "SPAN") {
        const span = document.createElement("span");
        span.textContent += ` Дата завершения задачи: ${taskUpdate()}`;
        li.append(span);
        li.style = "text-decoration: line-through; color: darkkhaki;";
      } else {
        li.lastChild.remove();
        li.style = "text-decoration: none; color: var(--basicColor);";
      }
    });

    // touch event

    li.addEventListener("touchend", async (event) => {
      // Deleting task
      const deleteKey = event.target;

      var now = new Date().getTime();

      if (now - lastTouchEnd <= 300) {
        // 300ms - типичный интервал для двойного касания
        // Здесь выполняется действие для двойного касания

        const trueDelete = confirm(
          `Are you sure DELETE? ${deleteKey.innerText}`
        );
        if (trueDelete == true) {
          await fetch(`/api/tasks/${el.id}`, { method: "DELETE" });

          deleteKey.remove();
        }

        event.preventDefault(); // Отменяет стандартное действие браузера (например, прокрутку)
      }
      lastTouchEnd = now;
    });

    li.textContent = `${el.name}. Ответственный: ${
      userData.name
    }. Срок выполнения: ${el.due_date.slice(0, 10)}.`;

    if (el.completion_date) {
      if (el.completion_date.slice(0, 10) != "2000-01-01") {
        const span = document.createElement("span");
        span.textContent += ` Дата завершения задачи: ${el.completion_date.slice(
          0,
          10
        )}`;
        li.append(span);
        li.style = "text-decoration: line-through; color: darkkhaki;";
      }
    }

    listAllTasks.append(li);
  });
};

getAllTasks();

const colorOfText = document.getElementById("colorOfText");
const scheduleCell = document.getElementsByClassName("scheduleCell");
const listOfcolor = [
  "brown",
  "cadetblue",
  "coral",
  "black",
  "green",
  "crimson",
];

listOfcolor.map((el) => {
  const button = document.createElement("button");
  button.style = `background: ${el}; margin: 5px;`;
  button.textContent = el;
  button.id = el;
  button.addEventListener("click", (event) => {
    for (let index = 0; index < scheduleCell.length; index++) {
      const element = scheduleCell[index];
      element.lastChild.tagName == "SPAN"
        ? (element.lastChild.style.color = button.id)
        : false;
    }
  });

  colorOfText.append(button);
});

///////////////// for Safary

// td.addEventListener("contextmenu", handleContextMenu);
// td.addEventListener("touchstart", handleTouchStart, { passive: false });

// let touchStartTime;
// let longPressTimer;

// function handleTouchStart(event) {
//   touchStartTime = Date.now();
//   longPressTimer = setTimeout(() => {
//     handleContextMenu(event);
//   }, 500); // 500ms для длинного нажатия
// }

// function handleContextMenu(event) {
//   event.preventDefault();
//   event.stopPropagation();

//   let name;
//   event.target.parentElement.tagName == "TR"
//     ? (name = event.target.id)
//     : (name = event.target.parentElement.id);

//   if (
//     event.target.parentElement.lastChild.type != "text" &&
//     event.target.lastChild.type != "text"
//   ) {
//     const input = document.createElement("input");
//     input.type = "text";
//     input.value = name;

//     // Обработка отмены при перемещении
//     const cancelInput = () => input.remove();

//     document.addEventListener("touchmove", cancelInput, { once: true });
//     document.addEventListener("scroll", cancelInput, { once: true });

//     // Обработка двойного касания
//     let lastTouchEnd = 0;
//     const handleTouchend = function (event) {
//       var now = Date.now();
//       if (now - lastTouchEnd <= 300) {
//         submitInput(input, name);
//         event.preventDefault();
//       }
//       lastTouchEnd = now;
//     };

//     document.addEventListener("touchend", handleTouchend, { once: true });

//     input.addEventListener("keyup", (event) => {
//       switch (event.key) {
//         case "Enter":
//           submitInput(input, name);
//           break;
//         case "Escape":
//           input.remove();
//           break;
//         default:
//           break;
//       }
//     });

//     // Автофокус и выделение текста
//     td.append(input);
//     input.focus();
//     input.select();
//   }
// }

// function submitInput(input, name) {
//   const content = input.value;
//   let user_name = enterName.value || "user_name";
//   document.getElementById(name).textContent = content;
//   updateScheduleByName(name, content, user_name);
//   input.remove();
// }

// // Очистка таймера при обычном касании
// td.addEventListener("touchend", () => {
//   clearTimeout(longPressTimer);
// });

// td.addEventListener("touchmove", () => {
//   clearTimeout(longPressTimer);
// });

/////////////////
