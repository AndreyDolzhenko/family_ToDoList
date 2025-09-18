// Иными словами, год является високосным в двух случаях:
// либо он кратен 4, но при этом не кратен 100, либо кратен 400.
// Год не является високосным, если он не кратен 4, либо он кратен 100,
// но при этом не кратен 400.

// Как определить високосный год:
// Проверьте, делится ли год на 4: без остатка.
// Если год делится на 100, то он является високосным, только если он также делится на 400.
// Если год делится на 4, но не делится на 100, то он високосный.

const currentYearCalender = (dayOfWeek, year) => {
  // Определяем количество дней в Феврале с учётом високосного года
  // dayOfWeek - индекс дня недели в массиве week (например 2, если среда); year - нужный год в цифра, например 2025
  const leapYear = (currentYear) => {
    if (
      (currentYear % 4 == 0 && currentYear % 100 != 0) ||
      currentYear % 400 == 0
    ) {
      return 29;
    } else {
      return 28;
    }
  };

  // массив с днями недели
  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // массив с именами месяцев и количеством дней в каждом. Високосный год определяется функцией
  let calendar = [
    {
      name: "January",
      days: 31,
    },
    {
      name: "February",
      // exception: [2024, 2028, 2032],
      days: leapYear(year),
    },
    {
      name: "March",
      days: 31,
    },
    {
      name: "April",
      days: 30,
    },
    {
      name: "May",
      days: 31,
    },
    {
      name: "June",
      days: 30,
    },
    {
      name: "July",
      days: 31,
    },
    {
      name: "August",
      days: 31,
    },
    {
      name: "September",
      days: 30,
    },
    {
      name: "October",
      days: 31,
    },
    {
      name: "November",
      days: 30,
    },
    {
      name: "December",
      days: 31,
    },
  ];


  let coutOfWeeklyDays = dayOfWeek; // первый день недели в году, индекс в массиве дней недели
  let currentCalendar = []; // масив с календарём запрашиваемого года

  for (let i = 0; i < calendar.length; i++) {
    // console.log(leapYear(choiseOfYear));
    for (let k = 1; k <= calendar[i].days; k++) {
      const currentDay = [week[coutOfWeeklyDays], k, calendar[i].name, year];
      currentCalendar.push(currentDay);
      coutOfWeeklyDays < 6 ? coutOfWeeklyDays++ : (coutOfWeeklyDays = 0);
    }
  }

  // console.log(currentCalendar);

  return currentCalendar;
};


