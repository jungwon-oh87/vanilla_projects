const input_field = document.getElementById("input-field");
const word_el = document.getElementById("word");
const time_el = document.getElementById("time");
const score_el = document.getElementById("score");
const gear_btn = document.getElementById("gear-btn");
const difficulty_container = document.getElementById("difficulty-container");
const difficulty_select = document.getElementById("difficulty");
const game_over_container = document.getElementById("game-over-container");

let answer_word = "";
let time = 10;
let score = 0;
let difficulty =
  localStorage.getItem("difficulty") === null
    ? "easy"
    : localStorage.getItem("difficulty");

const words = [
  "hello",
  "lorem",
  "text",
  "display",
  "font",
  "size",
  "spacing",
  "alignment",
  "webkit",
  "react",
  "javascript",
  "google",
];

function generateWord() {
  word_el.innerText = words[Math.floor(Math.random() * words.length)];
  answer_word = word.innerText;
}

function gameover() {
  game_over_container.innerHTML = `
    <h2>Game Over...</h2>
    <p>Your final score is ${score}</p>
    <button class="reload-btn" onclick="location.reload()">Reload</button>
    `;
  game_over_container.style.display = "flex";
}

function updateTime() {
  time--;
  time_el.innerText = `${time}s`;

  if (time <= 5) {
    time_el.style.color = "red";
  } else {
    time_el.style.color = "white";
  }

  if (time === 0) {
    clearInterval(timeInterval);
    gameover();
  }
}

function updateScore() {
  score_el.innerText = score;
}

function handleInput(e) {
  const input = e.target.value;
  if (input === answer_word) {
    // increase time
    if (difficulty === "easy") {
      time += 10;
    } else if (difficulty === "medium") {
      time += 5;
    } else {
      time += 3;
    }

    // increase score
    score++;
    updateScore();

    // reset input field
    input_field.value = "";

    // generate word again
    generateWord();
  }
}

function handleDifficulty(e) {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
}

input_field.focus();
difficulty_select.value =
  localStorage.getItem("difficulty") === null
    ? "easy"
    : localStorage.getItem("difficulty");
// get the word
generateWord();

// time ticking
const timeInterval = setInterval(updateTime, 1000);

// input listener
input_field.addEventListener("input", handleInput);

// gear button listener
gear_btn.addEventListener("click", () => {
  difficulty_container.classList.toggle("hide");
});

// difficulty select listener
difficulty_select.addEventListener("change", handleDifficulty);

// localStorage.clear();
