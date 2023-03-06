
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let city = new URLSearchParams(search);
  return city.get("city")
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let response = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    return await response.json();
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    let colDiv = document.createElement("div");
    colDiv.setAttribute("class", "col-6 col-lg-3 mb-4 sampleStyle");
    let cardLink = document.createElement("a");
    cardLink.setAttribute("id", adventure.id);
    cardLink.setAttribute("href", `detail/?adventure=${adventure.id}`);
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card activity-card");
    let img = document.createElement("img");
    img.setAttribute("src", adventure.image);
    let bannerDiv = document.createElement("div");
    bannerDiv.setAttribute("class", "category-banner")
    bannerDiv.innerText = adventure.category;
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body row justify-content-between align-items-center");
    let name = document.createElement("p");
    name.setAttribute("class", "col-12 col-lg-6 textToCenter");
    name.innerText=adventure.name;
    let price = document.createElement("p");
    price.setAttribute("class", "col-12 col-lg-6 textToCenter");
    price.innerText="₹"+adventure.costPerHead;
    price.setAttribute("id", "textToRight");
    let duration = document.createElement("p");
    duration.setAttribute("class", "col-12 col-lg-6 textToCenter");
    duration.innerText="Duration";
    let durationTime = document.createElement("p");
    durationTime.setAttribute("class", "col-12 col-lg-6 textToCenter");
    durationTime.innerText=adventure.duration+" Hours";
    durationTime.setAttribute("id", "textToRight");
    cardBody.append(name, price, duration,durationTime);
    cardDiv.append(img,cardBody);
    cardLink.appendChild(cardDiv);
    colDiv.append(cardLink, bannerDiv);
    let dataDiv = document.getElementById("data");
    //dataDiv1.append(price);
    dataDiv.appendChild(colDiv);
    //dataDiv.appendChild(img);
    console.log(dataDiv);
  })
  

}

 async function addNewAdventure(){
  let dataObject = 
  {
    "city": "goa"
  }
  
  const url = config.backendEndpoint+"adventures/new";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(dataObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => new Error("Could Not POST data"));
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  addNewAdventure
};
