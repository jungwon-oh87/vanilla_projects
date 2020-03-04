const add_btn = document.getElementById("add_btn");
const main = document.getElementById("main");
const double_btn = document.getElementById("double_btn");
const mill_btn = document.getElementById("mill_btn");
const sort_btn = document.getElementById("sort_btn");
const total_btn = document.getElementById("total_btn");
let data = [];

async function getUser() {
  const res = await fetch("https://randomuser.me/api/");
  const res_data = await res.json();
  // console.log(res_data.results[0]);

  const new_user = {
    first_name: res_data.results[0].name.first,
    last_name: res_data.results[0].name.last,
    money: Math.floor(Math.random() * 1000000)
  };

  data.push(new_user);

  updateDOM();
}

function numToDollar(num) {
  return `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

function updateDOM(updatedData = data) {
  // initialize it
  main.innerHTML =
    "<div class='flex justify-between border-black border-b-2'><strong>Person</strong><p>Wealth</p></div>";

  // loop thru the data and updateDOM
  updatedData.forEach(person => {
    const element = document.createElement("div");
    element.classList.add("flex", "justify-between");
    element.innerHTML = `<strong>${person.first_name} ${
      person.last_name
    }</strong><p>${numToDollar(person.money)}</p>`;
    main.appendChild(element);
  });
}

function doubleMoney() {
  // using Map, double money of each person in data
  data = data.map(person => {
    return {
      first_name: person.first_name,
      last_name: person.last_name,
      money: person.money * 2
    };
  });
  updateDOM();
}

function showMill() {
  const mill_data = data.filter(person => person.money >= 1000000);
  updateDOM(mill_data);
}

function sort() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function getTotal() {
  const total = data.reduce((acc, cur) => {
    return acc + cur.money;
  }, 0);
  console.log(total);
  const total_element = document.createElement("div");
  total_element.classList.add(
    "border-black",
    "border-t-2",
    "mt-4",
    "text-right",
    "bg-white"
  );
  total_element.innerHTML = `<h3>Total Wealth:  <strong>${numToDollar(
    total
  )}</strong></h2>`;
  main.appendChild(total_element);
}

add_btn.addEventListener("click", getUser);
double_btn.addEventListener("click", doubleMoney);
mill_btn.addEventListener("click", showMill);
sort_btn.addEventListener("click", sort);
total_btn.addEventListener("click", getTotal);
