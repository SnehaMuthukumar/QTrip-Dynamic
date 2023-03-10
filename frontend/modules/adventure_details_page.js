import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureId = new URLSearchParams(search);
  return adventureId.get("adventure")

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let response = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    return await response.json();
  }catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  if(adventure){
    let adventureName = document.getElementById("adventure-name");
    adventureName.innerHTML = adventure.name;
    let subTitle = document.getElementById("adventure-subtitle");
    subTitle.innerHTML = adventure.subtitle;
    adventure.images.forEach((image) => {
      let imageDiv = document.createElement("div");
      let imageElement = document.createElement("img");
      imageElement.setAttribute("src", image);
      imageElement.setAttribute("class", "activity-card-image");
      imageDiv.appendChild(imageElement);
      let photoGallery = document.getElementById("photo-gallery");
      photoGallery.appendChild(imageDiv);
    })
    let adventureContent = document.getElementById("adventure-content");
    adventureContent.innerText = adventure.content;
  }

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  let carousel = document.createElement("div");
  carousel.setAttribute("class", "carousel slide");
  carousel.setAttribute("id", "carouselExampleIndicators");
  carousel.setAttribute("data-bs-ride", "carousel");

  let carouselIndicators = document.createElement("div");
  carouselIndicators.setAttribute("class","carousel-indicators");

  let carouselInner = document.createElement("div");
  carouselInner.setAttribute("class", "carousel-inner")

  images.forEach((image, index) => {
    
    if(index==0){
      carouselIndicators.innerHTML+=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${index+1}"></button>`
      carouselInner.innerHTML+=`<div class="carousel-item active">
        <img src="${image}" class="activity-card-image">
      </div>`;
    }
    else{
      carouselIndicators.innerHTML+=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" aria-current="true" aria-label="Slide ${index+1}"></button>`
      carouselInner.innerHTML += `<div class="carousel-item">
      <img src="${image}" class="activity-card-image">
    </div>`
    }
  })

  carousel.append(carouselIndicators, carouselInner);
  carousel.innerHTML += `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>`;
photoGallery.innerHTML ="";
photoGallery.append(carousel);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costValue = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").textContent = costValue;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  let form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id
    }
    console.log(data);
    console.log(`date : ${data.date}`)
    const dataToBePosted = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      };
    fetch(config.backendEndpoint+"/reservations/new", dataToBePosted)
      .then(data => {
          if (data.ok) {
            alert("Success!");
            location.reload();
          }
          else{
            alert("Failed!")
          }
          return data.json();
          }).then(update => {
          console.log(update);
          })
      })
  
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
