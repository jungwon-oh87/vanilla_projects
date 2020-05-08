const main = document.getElementById("main");
const toggle_btn = document.getElementById("toggle-btn");
const outer_modal = document.getElementById("outer-modal");
const exit_btn = document.getElementById("exit");
const select = document.getElementById("select");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

const synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance();
let voices = [];

function toggleModal() {
  outer_modal.classList.toggle("show");
}

function createCards(item) {
  const { image, text } = item;
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  cardContainer.innerHTML = `
        <div class="img-container">
          <img src=${image} alt=${text}/>
        </div>
        <p class="card-info">${text}</p>
    `;
  main.appendChild(cardContainer);

  // Handle card click
  cardContainer.addEventListener("click", () => {
    setText(text);
    speak();
  });
}

function setText(text) {
  utter.text = text;
}

function speak() {
  synth.speak(utter);
}

// Get voices as a promise
function setSpeech() {
  return new Promise((resolve, reject) => {
    let id;
    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 50);
  });
}

// Set up select options
function getSelectOptions() {
  // A promise from setSpeech
  let s = setSpeech();

  // Load voices to the select option
  s.then((v) => {
    voices = v;
    console.log("after promise, voices: ", voices);
    voices.forEach((voice) => {
      const op_el = document.createElement("option");
      op_el.value = voice.name;
      op_el.innerHTML = `${voice.name} ${voice.lang}`;
      select.appendChild(op_el);
    });
  });
}

// Set up cards as looping thru data array
data.forEach(createCards);

// Set up select
getSelectOptions();

// Toggele box listeners
toggle_btn.addEventListener("click", toggleModal);
exit_btn.addEventListener("click", toggleModal);
outer_modal.addEventListener("click", (e) => {
  if (e.target === outer_modal) {
    toggleModal();
  }
});
