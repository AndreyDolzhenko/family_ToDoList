const choiceOfWorkplace = document.getElementsByClassName("choiceOfWorkplace");
const workPlace = document.getElementsByClassName("workPlace");
const allTd = document.querySelectorAll("td");
const autho = document.getElementById("autho");
const wellcome = document.getElementById("wellcome");
const tasksTop = document.getElementById("tasksTop");
const scheduleTop = document.getElementById("scheduleTop");
const scheduleDescription = document.getElementById("scheduleDescription");
const tasksDescription = document.getElementById("tasksDescription");
const addTask = document.getElementById("addTask");
const recordTask = document.getElementById("recordTask");
const listAllTasks = document.getElementById("listAllTasks");
const buttonOfTasks = document.getElementsByClassName("buttonOfTasks");

let curentUserId = 0;

scheduleTop.addEventListener("click", (event) => {
  scheduleManagment();
  createYearPlane();
  getAllSchedule();
});
tasksTop.addEventListener("click", (event) => tasksManagment());

addTask.addEventListener("click", (event) => taskTableCreate());
recordTask.addEventListener("click", (event) => taskRecording());

// Получение всех пунктов расписания

const getAllSchedule = async () => {
  try {
    const result = await fetch("/api/schedule");
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
  // console.log("data - ", id);
  // return id;
};

// Запись нового значения в расписании по name

const updateScheduleByName = async (name, content) => {
  await fetch(`/api/schedule/${name}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, content }),
  });
};

// Формирование календаря на год

const createYearPlane = () => {
  scheduleDescription.textContent = "";
  // const currentYearCalenderTable = currentYearCalender(2, 2025);
  // console.log(currentYearCalenderTable);

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
        // console.log(event.target.lastChild.type);

        let name;

        event.target.parentElement.tagName == "TR" ? name = event.target.id : name = event.target.parentElement.id;

        // console.log("event.target.parentElement - ", event.target.parentElement);

        if (event.target.parentElement.lastChild.type != "text" && event.target.lastChild.type != "text") {
          const input = document.createElement("input");
          input.type = "text";
          input.value = name;

          input.addEventListener("keyup", (event) => {            
            switch (event.key) {
              case "Enter":                
                const content = input.value;
                document.getElementById(name).textContent = content;
                // console.log("content", content);
                // console.log("td.lastChild.type", td.lastChild.type);
                updateScheduleByName(name, content);
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

  // console.log("scheduleCell", scheduleCell);

  // !!! Код ниже используется ОДИН раз для формирования в базе данных пунктов расписания

  // const newArr = Array.from(scheduleCell).map((el) => el.id);

  // console.log("newArr", newArr);

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

const taskRecording = async () => {
  const dataToSend = {
    name: document.getElementById("name").value,
    customer: curentUserId,
    performer: Number(document.getElementById("performer").value),
    due_date: document.getElementById("due_date").value,
    completion_date: document.getElementById("completion_date").value,
  };

  // console.log(dataToSend);

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

const taskTableCreate = async () => {
  const response = await fetch("/api/users"); // Pauses until fetch completes
  const data = await response.json(); // Pauses until JSON parsing completes

  const table = document.createElement("table");
  table.id = "taskTable";
  table.style = "margin: 5px 20px;";
  const tr = document.createElement("tr");
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
          option.textContent = el.name;
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

  // console.log(scheduleTop.style.borderBottomColor);
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

// console.log(currentYearCalender(2, 2025));

const choiseOfPeriod = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  // choiseOfYear = year;

  // const lastDayOfMonth = new Date(year, month + 1, 0);
  // let date = new Date(year, month, 1);

  // for (let index = 0; index < 10; index++) {
  //   console.log(date.setDate(date.getDate() + index), month, year);
  // }
};

autho.addEventListener("keyup", async (event) => {
  // event.key == "Enter" ? console.log(event.target.value) : false;
  if (event.key == "Enter") {
    const response = await fetch("/api/users");
    const data = await response.json();
    let nameTop = "Нет такого пользователя. Зарегистрируйтесь!";
    let found = false;

    data.forEach((el) => {
      if (event.target.value === el.name) {
        curentUserId = el.id;
        nameTop = el.name;
        wellcome.innerHTML = `Добро пожаловать, ${nameTop}!`;
        // console.log(name);
        found = true;
      }
    });

    if (!found) {
      wellcome.textContent = nameTop;
    }
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
    // console.log(userData);
    const li = document.createElement("li");
    li.textContent = `${el.name}. Ответственный: ${userData.name}. Срок выполнения: ${el.due_date}.`;
    listAllTasks.append(li);
  });
};

getAllTasks();
