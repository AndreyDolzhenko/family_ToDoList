const usersOperationsList = document.getElementById("usersOperationsList");
const usersOperationsField = document.getElementById("usersOperationsField");
const addUser = document.getElementById("addUser");
const addUserForm = document.getElementById("addUserForm");
const deleteUser = document.getElementById("deleteUser");

const options = document.getElementById("options");

const controlField = document.getElementById("controlField");

// !!! FUNCTIONS

const getAllUsers = async () => {
  controlField.textContent = "";
  const response = await fetch("/api/users");
  const data = await response.json();

  data.forEach((el) => {
    const li = document.createElement("li");
    li.textContent = `${el.name} (password: ${el.password})`;
    li.id = el.id;
    // li.onclick = () => console.log("popup()");
    controlField.append(li);
  });
};

const deleteElem = async (el) => {
  let check = confirm("Are you ready DELETE?");

  check == true
    ? await fetch(`api/users/${el}`, { method: "DELETE" })
    : popup();

  getAllUsers();
};

const deleteAllUsers = async (event) => {
  controlField.textContent = "";
  addUserForm.style.display = "none";

  const response = await fetch("/api/users");
  const data = await response.json();

  data.forEach((el) => {
    const li = document.createElement("li");
    li.className = "deleteElem";
    li.id = el.id;
    li.textContent = `${el.name} (team: ${el.team})`;
    controlField.append(li);
  });

  const clicker = document.getElementsByClassName("deleteElem");

  for (let index = 0; index < clicker.length; index++) {
    clicker[index].addEventListener("click", (event) =>
      deleteElem(event.target.id)
    );
    // console.log(clicker[index].id);
  }
};

const getAdminPass = async () => {
  const userId = await fetch(`/api/users/Andrey`);
  const userIdResult = await userId.json();

  console.log(userIdResult.password);
};

// // !!! OPTIONS

const adminPassword = "123654";

const userPass = prompt("Enter admin pass!");

if (userPass === adminPassword) {
  deleteUser.addEventListener("click", () => deleteAllUsers());

  usersOperationsList.addEventListener("click", (event) => {
    options.innerHTML = "";
    usersOperationsField.style.display = "block";
    options.append(usersOperationsField);
  });

  addUser.addEventListener("click", () => {
    addUserForm.style.display = "flex";
    getAllUsers();
    addUserForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      controlField.textContent = "";
      const name = document.getElementById("name").value;
      const team = document.getElementById("team").value;

      const response = await fetch("api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, team }),
      });

      const data = await response.json();
      // alert(data.name + "\n" + data.team);
      getAllUsers();
    });
    // deleteAllUsers();
  });
} else {
  alert("Password false!!!");
  window.location.href = "/";
}
