import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let response = await fetch(config.backendEndpoint+`/reservations/`);
    return await response.json();
  }catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length == 0){
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none";
  }
  else{
    document.getElementById("reservation-table-parent").style.display="block";
    document.getElementById("no-reservation-banner").style.display="none";
    let tableBody = document.getElementById("reservation-table");
    reservations.forEach((reservation) => {
      let tr = document.createElement("tr");
      tr.innerHTML += `<td>${reservation.id}</td>`;
      tr.innerHTML += `<td>${reservation.name}</td>`;
      tr.innerHTML += `<td>${reservation.adventureName}</td>`;
      tr.innerHTML += `<td>${reservation.person}</td>`;
      tr.innerHTML += `<td>${new Date(reservation.date).toLocaleDateString("en-IN")}</td`;
      tr.innerHTML += `<td>${reservation.price}</td>`;
      let dateTime = new Date(reservation.time);
      let dateString = dateTime.getDate()+" "+dateTime.toLocaleString('en-IN', { month: 'long' })+" "+dateTime.getFullYear()+", ";
      let time = dateTime.toLocaleString().split(", ")[1].toLowerCase();
      dateString+=time;
      tr.innerHTML += `<td>${dateString}</td>`;
      tr.innerHTML += `<td><button id=${reservation.id} type="button" class="reservation-visit-button border-0"><a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a></button></td>`;
      tableBody.appendChild(tr);
    })
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
