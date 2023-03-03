import config from "../conf/index.js";


async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //console.log(config.backendEndpoint+"/cities");
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let response = await fetch(config.backendEndpoint+"/cities");
    return await response.json();
  }catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let outerDiv = document.createElement("div");
  outerDiv.setAttribute("class", "col-6 col-lg-3 align-items-center mb-4");
  let imgLink = document.createElement("a");
  imgLink.setAttribute("href",`pages/adventures/?city=${id}`);
  let tileDiv = document.createElement("div");
  tileDiv.setAttribute("class", "tile");

  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card");
  cardDiv.setAttribute("style", "height: 100%;")
  let imgCity = document.createElement("img");
  imgCity.setAttribute("src",image);
  imgCity.setAttribute("class", "card-img")
  imgCity.setAttribute("id", id);
  let cityName = document.createElement("h5");
  cityName.innerText=city;
  cityName.setAttribute("class", "tile-text");
  cityName.setAttribute("style", "bottom: 7%;")
  let descriptionElement = document.createElement("p");
  descriptionElement.innerText=description;
  descriptionElement.setAttribute("class", "tile-text");
  descriptionElement.setAttribute("style", "top: 93%");
  cardDiv.append(imgCity, cityName, descriptionElement);
  tileDiv.appendChild(cardDiv);
  imgLink.appendChild(tileDiv);
  outerDiv.appendChild(imgLink);
  
  let dataDiv = document.getElementById("data");
  dataDiv.appendChild(outerDiv);
}


export { init, fetchCities, addCityToDOM };
