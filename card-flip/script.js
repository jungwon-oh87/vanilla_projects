// show, hide, question, answer
const card_container = document.getElementById("cards-container");
const next_btn = document.getElementById("next-btn");
const prev_btn = document.getElementById("prev-btn");
const current_page = document.getElementById("current-page");
const close_button = document.getElementById("close-btn");
const show_add_button = document.getElementById("show-add-btn");
const clear_button = document.getElementById("clear-btn");

const data = [
  { question: "question number 1", answer: "answer number 1" },
  { question: "question number 2", answer: "answer number 2" },
  { question: "question number 3", answer: "answer number 3" },
];

const cardsEl = [];
let currentActiveCard = 0;

const createCards = () => {
  data.forEach((item, index) => createCard(item, index));
};

const createCard = (item, index) => {
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

  card_container.appendChild(card);
  cardsEl.push(card);

  // update number of card
  updateCurrentText();
};

const updateCurrentText = () => {
  current_page.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
};

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
  currentActiveCard--;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});
