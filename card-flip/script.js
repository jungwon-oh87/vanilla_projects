const card_container = document.getElementById("cards-container");
const next_btn = document.getElementById("next-btn");
const prev_btn = document.getElementById("prev-btn");
const current_page = document.getElementById("current-page");
const close_button = document.getElementById("close-btn");
const show_add_button = document.getElementById("show-add-btn");
const clear_button = document.getElementById("clear-btn");
const add_new_container = document.getElementById("add-new-container");
const question_input = document.getElementById("question");
const answer_input = document.getElementById("answer");
const add_submit_button = document.getElementById("add-submit");

// const data = [
//   { question: "question number 1", answer: "answer number 1" },
//   { question: "question number 2", answer: "answer number 2" },
//   { question: "question number 3", answer: "answer number 3" },
// ];

let currentActiveCard = 0;
const cardsEl = [];
const cardsData = [];
cardsData.length = 0;
cardsData.push(getCardsData());
// const cardsData = getCardsData();
console.log("data type checking: ", cardsData);

function createCards() {
  // console.log(typeof data);
  cardsData.length > 1
    ? cardsData.forEach((item, index) => createCard(item, index))
    : "";
  // data.forEach((item, index) => createCard(item, index));
}

function createCard(item, index) {
  console.log("item.q checking: ", item.question);
  console.log("item.a checking: ", item.answer);

  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${item.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${item.answer}</p>
        </div>
    </div>
    `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  cardsEl.push(card);
  card_container.appendChild(card);

  // update number of card
  updateCurrentText();
}

function updateCurrentText() {
  current_page.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

function getCardsData() {
  // const cards;
  // cards.push(JSON.parse(localStorage.getItem("cards")));
  const cards = JSON.parse(localStorage.getItem("cards"));

  return cards === null ? "" : cards;
}

function setCardsData(cards) {
  console.log("checking... ", cards);

  localStorage.setItem("cards", JSON.stringify(cards));
  //window.location.reload();
}

createCards();

next_btn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

prev_btn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

show_add_button.addEventListener("click", () => {
  add_new_container.classList.add("show");
});

close_button.addEventListener("click", () => {
  add_new_container.classList.remove("show");
});

add_submit_button.addEventListener("click", () => {
  const question = question_input.value;
  const answer = answer_input.value;

  const input_object = { question: question, answer: answer };

  console.log("input checking: ", input_object);
  createCard(input_object);

  // currentActiveCard++;
  question_input.value = "";
  answer_input.value = "";

  add_new_container.classList.remove("show");
  cardsData.push(input_object);
  setCardsData(input_object);
});

clear_button.addEventListener("click", () => {
  localStorage.clear();
  card_container.innerHTML = "";
  window.location.reload();
});
