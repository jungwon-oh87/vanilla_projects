const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const text_input = document.getElementById("text-input");
const number_input = document.getElementById("number-input");
const form = document.getElementById("form");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

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
  )}</span><button class="delete-btn" id="delete-btn" onclick="deleteTransaction(${
    transaction.id
  })">x</button>`;

  // add list to ul
  list.appendChild(list_item);
}

function createTransaction(e) {
  e.preventDefault();

  if (text_input.value.trim() === "" || number_input.value.trim() === "") {
    alert("inputs required");
  } else {
    // create a new transaction
    const new_transaction = {
      id: Math.floor(Math.random() * 1000000),
      name: text_input.value,
      amount: +number_input.value
    };

    transactions.push(new_transaction);

    addTransactionsDOM(new_transaction);
    updateBalance();
    updateLocalStorage();

    // Reset input fields
    text_input.value = "";
    number_input.value = "";
  }
}

function deleteTransaction(transaction_id) {
  console.log("delete called..");
  // transactions.forEach(t => console.log(t.id));
  transactions.forEach((t, index) => {
    if (t.id === transaction_id) {
      transactions.splice(index, 1);
    }
  });
  updateLocalStorage();
  init();
  console.log(transactions);
}

function updateBalance() {
  const all_values = transactions.map(t => t.amount);
  const total = all_values.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income_values = all_values.filter(value => value > 0);
  const expense_values = all_values.filter(value => value < 0);

  // Display Balance
  balance.innerText = `$${total}`;

  // Display Income
  money_plus.innerText = `$${income_values.reduce(
    (acc, item) => (acc += item),
    0
  )}`;

  // Display Expense
  money_minus.innerText = `$${expense_values.reduce(
    (acc, item) => (acc += item),
    0
  ) * -1}`;
}

function updateLocalStorage() {
  console.log("update local storage called");
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionsDOM);

  updateBalance();
}

init();

form.addEventListener("submit", createTransaction);
// delete_btn.addEventListener("click", () => console.log("delete called"));
