const getBackupSchedule = document.getElementById("getBackupSchedule");
const getScheduleTableNames = document.getElementById("getScheduleTableNames");
const tablesBD = document.getElementById("tablesBD");
const restoreDB = document.getElementById("restoreDB");

const backupTableFunction = async (name) => {
  const response = await fetch(`/api/backup/${name}`);
  const res = await response.json();
};

const backupTools = async (event) => {
  const response = await fetch("/api/backup/tables");
  const res = await response.json();

  // console.log("event", res);

  tablesBD.innerHTML = "";

  Array.from(res).map((el) => {
    const button = document.createElement("button");
    button.id = el;
    button.textContent = el;
    button.style = "margin: 5px; cursor: pointer;";
    const nameTable = el.toLowerCase();

    switch (event.target.id) {
      case "getBackupSchedule":
        button.onclick = () => backupTableFunction(nameTable);
        break;

      case "restoreDB":
        button.onclick = (event) => console.log(event.target.id);
        break;

      default:
        break;
    }

    tablesBD.append(button);
  });
};

getBackupSchedule.addEventListener("click", async (event) => {
  backupTools(event);
});

restoreDB.addEventListener("click", async (event) => {
  backupTools(event);
});
