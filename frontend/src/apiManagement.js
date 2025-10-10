document
  .getElementById("registrationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const team = document.getElementById("team").value;
    const password = String(document.getElementById("password").value);

    const userExist = await fetch("/api/users");
    const userResult = await userExist.json();

    const userNames = userResult.map((el) => el.name);

    if (userNames.includes(name) == true) {
      const userId = await fetch(`/api/users/${name}`);
      const userIdResult = await userId.json();

      console.log(name, team, "password" + typeof(password));

      const response = await fetch(`api/users/${userIdResult.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, team, password }),
      });

      const data = await response.json();
      alert("Данные изменены:" + "\n" + data.name + "\n" + data.team);
    } else {
      console.log(name, team, "password" + typeof(password));
      const response = await fetch("api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, team, password }),
      });

      const data = await response.json();
      alert("Данные внесены:" + "\n" + data.name + "\n" + data.team);
    }

    // console.log("userIdResult.id", userIdResult.id);
  });
