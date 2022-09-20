function removeSeats() {
    localStorage.removeItem("selectedMovieIndex");
    localStorage.removeItem("selectedMoviePrice");
    localStorage.removeItem("selectedSeats");
}

removeSeats();





const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied'); //uoccupied seats
const count = document.getElementById('count'); //count of seats
const total = document.getElementById('total'); //count price 
const movieSelect = document.getElementById('movie'); //which movie u selected
let seatsSelect = document.getElementById('chooseseats'); //hpw many seats user can select
let seatsSelectCount = seatsSelect.value;
let seatscount = +seatsSelect.value;
console.log(seatscount);
let ids = 0;
populateUI();
let ticketPrice = +movieSelect.value;
let array = [];
// let removeBtnEl = document.getElementById("removeBtn");

function removeSeats() {
    localStorage.removeItem("selectedMovieIndex");
    localStorage.removeItem("selectedMoviePrice");
    localStorage.removeItem("selectedSeats");
}

removeSeats();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //copy selected seats into arr
    // map through array
    //return new array of indexes
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
// get data from localstorage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    let ids = 0;
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
                seat.setAttribute(id, "seat" + ids);
                ids += 1;
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        e.target.setAttribute("id", "seat" + ids);
        ids += 1;
        array.push(e.target.id);
        console.log(seatsSelect);
        if (array.length > seatsSelectCount) {
            let removedElId = array.pop();
            let removedEl = document.getElementById(removedElId);
            removedEl.classList.remove("selected");
        }
        console.log(array);
        updateSelectedCount();
    }
});
// intial count and total
updateSelectedCount();
seatsSelect.addEventListener("change", function() {
    seatsSelectCount = document.getElementById("chooseseats").value;
})