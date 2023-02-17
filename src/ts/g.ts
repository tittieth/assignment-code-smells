/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getTotalJumpingLength(jumpings: number[]): number {
  return jumpings.reduce((jumpDistanceSoFar, currentJump) => {
    return jumpDistanceSoFar + currentJump;
  });
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public hasHandedInOnTime: boolean,
    public hasPassed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  if (
    student.name === "Sebastian" &&
    student.hasHandedInOnTime &&
    student.hasPassed
  ) {
    return "VG";
  } else {
    return "IG";
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temp {
  constructor(
    public location: string,
    public timeForMeasurement: Date,
    public temperature: number
  ) {}
}

function calculateAverageWeeklyTemperature(temperatureHeights: Temp[]) {
  const MILLISECONDS_IN_A_WEEK: number = 604800000;
  const DAYS_IN_A_WEEK: number = 7;
  let totalTemperatures: number = 0;

  for (let i = 0; i < temperatureHeights.length; i++) {
    if (
      temperatureHeights[i].location === "Stockholm" &&
      temperatureHeights[i].timeForMeasurement.getTime() >
        Date.now() - MILLISECONDS_IN_A_WEEK
    ) {
      totalTemperatures += temperatureHeights[i].temperature;
    }
  }

  return totalTemperatures / DAYS_IN_A_WEEK;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

class Product {
  constructor(
    public name: string,
    public price: number,
    public amount: number,
    public description: string,
    public image: string,
    public parent: HTMLElement
  ) {}
}

function showProduct(products: Product) {
  let container = document.createElement("div");

  let title = document.createElement("h4");
  let price = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = products.name;
  price.innerHTML = price.toString();
  imageTag.src = products.image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(price);

  products.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function createContainer(checkbox: HTMLInputElement): HTMLLIElement {
  let container = document.createElement("li");
  container.appendChild(checkbox);
  return container;
}

function createCheckBox(checked: boolean): HTMLInputElement {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  return checkbox;
}

function presentStudents(students: Student[]) {
  let listOfPassedStudents = document.querySelector("ul#passedstudents");
  let listOfFailedStudents = document.querySelector("ul#failedstudents");

  for (const student of students) {
    const checkbox = createCheckBox(student.hasHandedInOnTime);
    const container = createContainer(checkbox);

    if (student.hasHandedInOnTime) {
      listOfPassedStudents?.appendChild(container);
    } else {
      listOfFailedStudents?.appendChild(container);
    }
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings() {
  let texts: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return texts.join("");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
const MINIMUM_AGE = 20;
const EPOCH_YEAR = 1970;

class User {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {}
}

function calculateAge(user: User) {
  let ageDiff = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - EPOCH_YEAR);

  return userAge;
}

function checkUserAge(user: User) {
  let userAge = calculateAge(user);

  // Validation
  if (userAge >= MINIMUM_AGE) {
    // Logik för att skapa en användare
  } else {
    return `Du är under ${MINIMUM_AGE} år`;
  }
}
