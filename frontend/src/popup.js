const textPopup = document.createElement("div");
textPopup.className = "textPopup";

const yes = document.createElement("button");
const no = document.createElement("button");

yes.style.alignSelf = "center";
no.style.alignSelf = "center";

yes.value = "yes";
no.value = "no";

yes.textContent = "yes";
no.textContent = "no";

yes.className = "yesNo";
no.className = "yesNo";

const popup = () => {
  const body = document.querySelector("body");
  const popupPlace = document.createElement("div");
  textPopup.append(yes);
  textPopup.append(no);
  popupPlace.append(textPopup);
  popupPlace.className = "popupPlace";

  yes.onclick = (event) => {
    popupPlace.style.display = "none";
    console.log(event.target.value);
  };
  no.onclick = (event) => {
    popupPlace.style.display = "none";
    // check = event.target.value;
    console.log(event.target.value);
  };

  body.prepend(popupPlace);
};
