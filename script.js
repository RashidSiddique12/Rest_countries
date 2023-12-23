const makeDiv = (data) => {
  const countries = document.querySelector(".countries");
  const regionArr = [];
  for (let i = 0; i < data.length; i++) {
    const countryBox = document.createElement("div");
    countryBox.className = "countryBox";
    //img
    const img = document.createElement("img");
    const src = data[i].flags.png;
    img.setAttribute("src", src);
    countryBox.appendChild(img);

    //databox
    const databox = document.createElement("div");
    databox.className = "databox";

    //heading
    const h4 = document.createElement("h4");
    h4.appendChild(document.createTextNode(data[i].name.common));
    databox.appendChild(h4);

    //p
    const populationP = document.createElement("p");
    const regionP = document.createElement("p");
    const capitalP = document.createElement("p");

    //span
    const populationSpan = document.createElement("span");
    const regionSpan = document.createElement("span");
    const capitalSpan = document.createElement("span");

    populationSpan.appendChild(document.createTextNode(`Population:`));
    regionSpan.appendChild(document.createTextNode(`Region:`));
    capitalSpan.appendChild(document.createTextNode(`Capital:`));

    populationP.appendChild(populationSpan);
    regionP.appendChild(regionSpan);
    capitalP.appendChild(capitalSpan);

    populationP.appendChild(document.createTextNode(`${data[i].population}`));
    regionP.appendChild(document.createTextNode(`${data[i].region}`));
    capitalP.appendChild(document.createTextNode(`${data[i].capital}`));

    databox.appendChild(populationP);
    databox.appendChild(regionP);
    databox.appendChild(capitalP);

    countryBox.appendChild(databox);
    countries.appendChild(countryBox);

    //Region Array
    if (!regionArr.includes(data[i].region)) {
      regionArr.push(data[i].region);
    }
  }
  //filtercountry
  // console.log(regionArr)
  regionArr.forEach((region) => {
    const option = document.createElement("option");
    option.className = "dropdown-item";
    option.appendChild(document.createTextNode(region));

    const select = document.querySelector(".dropdown-menu");
    select.appendChild(option);
  });
};

const SeachByCountryName = (data) => {};

const fetchApi = async () => {
  let data = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
  );
  data = await data.json();
  // console.log(flagObj.length);

  // filterByRegion(data);
  makeDiv(data);
};

fetchApi();

//searching
const search = document.querySelector("#search");
search.addEventListener("keyup", (e) => {
  const userInput = e.target.value.toLowerCase();
  const countryBox = document.querySelectorAll(".countryBox");
  Array.from(countryBox).forEach((country) => {
    const countryName =
      country.children[1].children[0].textContent.toLocaleLowerCase();
    if (countryName.indexOf(userInput) != -1) {
      // console.log(country)
      country.style.display = "block";
    } else {
      country.style.display = "none";
    }
  });
});

//filtering

const filter = document.getElementById("dropdown");
// console.log(filter)
filter.addEventListener("click", (e) => {
  const UserRegion = e.target.value;
  // console.log(UserRegion);
  const countryBox = document.querySelectorAll(".countryBox");
  Array.from(countryBox).forEach((country) => {
    const dataRegion =
      country.lastElementChild.children[2].lastChild.textContent;
    //   console.log(UserRegion);
    if (UserRegion === "Filter by Region") {
      country.style.display = "block";
    } else if (dataRegion === UserRegion) {
      country.style.display = "block";
    } else {
      country.style.display = "none";
    }
  });
});

//darkMmode
const mode = document.querySelector(".mode");
// console.log(mode);
mode.addEventListener("click", (e) => {
  const modetype = e.target.lastChild.textContent;
  // console.log(e.target);
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const input = document.querySelector("section input");
  const select = document.querySelector("select");
  const countryBox = document.querySelectorAll(".countryBox");
  const icon = e.target.parentElement.children[0].children[0];

  if (modetype === "Dark Mode") {
    body.style.backgroundColor = "hsl(207, 26%, 17%)";
    body.style.color = "white";
    header.style.backgroundColor = "hsl(209, 23%, 22%)";
    input.style.backgroundColor = "hsl(209, 23%, 22%)";
    input.style.backgroundImage = "url('./images/icon-magnifying-glass-white.svg')";
    input.style.color = "white";
    input.className ="searchBlack";
    select.style.backgroundColor = "hsl(209, 23%, 22%)";
    select.style.color = "white";
    countryBox.forEach((box) => {
      box.style.backgroundColor = "hsl(209, 23%, 22%)";
    });

    e.target.lastChild.textContent = "Light Mode";
    icon.className = "fa-solid fa-sun";
    

  } else {
    body.style.backgroundColor = "hsl(0, 0%, 98%)";
    body.style.color = "hsl(200, 15%, 8%)";
    header.style.backgroundColor = "hsl(0, 0%, 100%)";
    input.style.backgroundColor = "hsl(0, 0%, 100%)";
    input.style.backgroundImage = "url('./images/icon-magnifying-glass-grey.svg')";
    input.style.color = "grey";
    input.className ="searchWhite";
    select.style.backgroundColor = "hsl(0, 0%, 100%)";
    select.style.color = "hsl(200, 15%, 8%)";
    countryBox.forEach((box) => {
      box.style.backgroundColor = "hsl(0, 0%, 100%)";
    });

    e.target.lastChild.textContent = "Dark Mode";
    icon.className = "fa-regular fa-moon";

  }
});
