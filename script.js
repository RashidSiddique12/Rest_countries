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

    populationP.appendChild(document.createTextNode(`${(data[i].population).toLocaleString()}`));
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



const fetchApi = async () => {
  try {
    let data = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
    );
    data = await data.json();
    makeDiv(data);
  } catch (error) {
    console.log(error);
  }
};

fetchApi();

//when dom loaded
document.addEventListener("DOMContentLoaded",()=>{

  const updateDisplay = (e)=>{
    const UserInput = search.value.toLowerCase().trim();
    const filteredRegion = filter.value;
    const countryBoxes = document.querySelectorAll('.countryBox');
    // console.log(countryBoxes);
    countryBoxes.forEach((country)=>{
      const countryName = country.lastChild.firstChild.textContent.toLocaleLowerCase();
      const region = country.lastChild.children[2].lastChild.textContent;
      
      const matchesSearch = countryName.includes(UserInput);
      const matchesFilter = filteredRegion === "Filter by Region" || filteredRegion === region;
      // console.log(matchesSearch, matchesFilter);

      if(matchesSearch && matchesFilter){
        country.style.display = "block";
      }
      else{
        country.style.display = "none";
      }
    })
  }

  //searching and filtering
  const search = document.querySelector("#search");
  const filter = document.getElementById("dropdown");

  search.addEventListener("keyup", updateDisplay);
  filter.addEventListener("change", updateDisplay);


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
  const dropdown = document.querySelector(".dropdown");
  const selectOption = document.querySelectorAll("select option");
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
    dropdown.style.backgroundColor = "hsl(209, 23%, 22%)";
    select.style.color = "white";
    Array.from(selectOption).forEach((option)=>{
      option.style.backgroundColor = "hsl(209, 23%, 22%)";
    })
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
    dropdown.style.backgroundColor = "white";

   Array.from(selectOption).forEach((option)=>{
      option.style.backgroundColor= "white";
    })

    countryBox.forEach((box) => {
      box.style.backgroundColor = "hsl(0, 0%, 100%)";
    });

    e.target.lastChild.textContent = "Dark Mode";
    icon.className = "fa-regular fa-moon";

  }
});

})
