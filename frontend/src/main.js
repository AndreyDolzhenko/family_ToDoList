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

scheduleTop.addEventListener("click", (event) => scheduleManagment());
tasksTop.addEventListener("click", (event) => tasksManagment());

addTask.addEventListener("click", (event) => taskTableCreate());
recordTask.addEventListener("click", (event) => taskRecording());

const taskRecording = async () => {
  const dataToSend = {
    name: document.getElementById("name").value,
    customer: curentUserId,
    performer: Number(document.getElementById("performer").value),
    due_date: document.getElementById("due_date").value,
    completion_date: document.getElementById("completion_date").value,
  };

  console.log(dataToSend);

  const { name, customer, performer, due_date, completion_date } = dataToSend;

  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, customer, performer, due_date, completion_date }),
  });
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

  console.log(scheduleTop.style.borderBottomColor);
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

  const lastDayOfMonth = new Date(year, month + 1, 0);
  let date = new Date(year, month, 1);

  for (let index = 0; index < 10; index++) {
    console.log(date.setDate(date.getDate() + index), month, year);
  }
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
  const response = await fetch("/api/users"); // Pauses until fetch completes
  const data = await response.json(); // Pauses until JSON parsing completes

  const allTaskList = await fetch("/api/tasks"); // Pauses until fetch completes
  const dataTasks = await allTaskList.json();
  
  dataTasks.map(async el => {
    const user = await fetch(`/api/users/${el.performer}`);
    const userData = await user.json();
    // console.log(userData);
    const li = document.createElement("li");
    li.textContent = `${el.name}. Ответственный: ${userData.name}. Срок выполнения: ${el.due_date}.`;
    listAllTasks.append(li);
  });
}

getAllTasks();
