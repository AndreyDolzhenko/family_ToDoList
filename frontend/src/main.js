const choiceOfWorkplace = document.getElementsByClassName("choiceOfWorkplace");
const workPlace = document.getElementsByClassName("workPlace");
const allTd = document.querySelectorAll("td");

for (let index = 0; index < choiceOfWorkplace.length; index++) {
  choiceOfWorkplace[index].addEventListener("click", (event) => {
    for (let index = 0; index < allTd.length; index++) {
      allTd[index].style = "border: 1px solid var(--basicColor)";
    }
    choiceOfWorkplace[index].style.borderBottomColor = "var(--basicBG)";
  });
}

console.log(currentYearCalender(2, 2025));

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
