const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const text_input = document.getElementById("text-input");
const number_input = document.getElementById("number-input");

const dummyTransactions = [
  { id: 1, name: "donation", amount: -30 },
  { id: 2, name: "weekly income", amount: 1500 },
  { id: 3, name: "grocery", amount: -145 },
  { id: 4, name: "part-time income", amount: 250 },
  { id: 5, name: "gloves", amount: -100 }
];

let transactions = dummyTransactions;

function addTransactionsDOM(transaction) {
  console.log("addtransactionDOM called");
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  // create list element
  const list_item = document.createElement("li");

  // add class based on value
  list_item.classList.add(sign === "-" ? "minus" : "plus");

  // add others to list element
  list_item.innerHTML = `${transaction.name} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">x</button>`;

  // add list to ul
  list.appendChild(list_item);
}

function init() {
  console.log("called");
  list.innerHTML = "";
  transactions.forEach(addTransactionsDOM);
}

init();
