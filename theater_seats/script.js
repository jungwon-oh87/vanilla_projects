const select = document.getElementById("select");
const theater = document.getElementById("theater");

const seat_num_el = document.getElementById("seat-num");
const price_el = document.getElementById("price");

let selected_seat_num = 0;
let movie_price = +select.value;

function selectSeat(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    if (e.target.classList.contains("selected")) {
      selected_seat_num++;
      seat_num_el.innerText = selected_seat_num;
      price_el.innerText = selected_seat_num * movie_price;
    } else {
      selected_seat_num--;
      seat_num_el.innerText = selected_seat_num;
      price_el.innerText = selected_seat_num * movie_price;
    }
  } else if (e.target.classList.contains("occupied")) {
    alert("It has been already booked.");
  }
}

function handleSelect(e) {
  movie_price = e.target.value;

  seat_num_el.innerText = selected_seat_num;
  price_el.innerText = selected_seat_num * movie_price;
}

console.log("movie default price: ", movie_price);
theater.addEventListener("click", selectSeat);
select.addEventListener("change", handleSelect);
