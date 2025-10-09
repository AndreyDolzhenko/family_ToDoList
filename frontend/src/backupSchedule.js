const getBackupSchedule = document.getElementById("getBackupSchedule");
const getScheduleTableNames = document.getElementById("getScheduleTableNames");
const tablesBD = document.getElementById("tablesBD");

const backupTableFunction = async (name) => {
  const response = await fetch(`/api/backup/${name}`);
  const res = await response.json();  
};

getBackupSchedule.addEventListener("click", async () => {
  const response = await fetch("/api/backup/tables");
  const res = await response.json();
 
  Array.from(res).map(el => {
    const button = document.createElement("button");
    button.id = el;
    button.textContent = el;
    button.style = "margin: 5px; cursor: pointer;";
    const nameTable = el.toLowerCase();    
    button.onclick = () => backupTableFunction(nameTable);
    tablesBD.append(button);
  });


});
