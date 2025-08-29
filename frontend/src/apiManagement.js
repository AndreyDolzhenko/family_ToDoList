
document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const team = document.getElementById("team").value;

    const response = await fetch("api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, team }),
    });

    const data = await response.json()
    alert(data.name + "\n" + data.team);
   
});