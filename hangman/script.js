const answer_display = document.getElementById("answer_display");
const hint = document.getElementById("hint");
const popup_container = document.getElementById("popup_container");
const final_message = document.getElementById("final_message");
const notification_container = document.getElementById(
  "notification_container"
);
const wrong_letters_element = document.getElementById("wrong_letters");
const figure_parts = document.querySelectorAll(".figure_part");
const play_btn = document.getElementById("play_btn");
let correct_letters = [];
let wrong_letters = [];
let selected_word = "";
const api_key = config.x_rapidapi_key;

const url = "https://wordsapiv1.p.rapidapi.com/words/?random=true";

async function getAPI(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": api_key
    }
  });
  return response.json();
}

function displayWord(selected_word) {
  answer_display.innerHTML = `${selected_word
    .split("")
    .map(
      letter =>
        // CREATE BLANKS FOR # OF WORD AND CHECK EACH LETTER
        `<span class="letter">
        ${correct_letters.includes(letter) ? letter : ""}
        </span>`
    )
    .join("")}`;

  displayPopup();
}
function startGame() {
  // RESET THE GAME
  correct_letters = [];
  wrong_letters = [];
  popup_container.style.display = "none";

  getAPI(url).then(data => {
    // TAKE THE FIRST WORD ONLY IF THERE ARE TWO
    const words = data.word.split(" ");
    selected_word = words[0];
    console.log("selected word: ", selected_word);

    displayWord(selected_word);

    // DISPLAY HINT
    getHint(data);

    window.addEventListener("keydown", e => {
      if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 189) {
        // GET THE KEY INPUT
        const letter = e.key;
        // CHECK IF THE LETTER IS IN THE SELECTED WORD
        if (selected_word.includes(letter)) {
          // CHECK IF THE LETTER IS ALREADY IN CORRECT LETTERS. SHOULD NOT!
          if (!correct_letters.includes(letter)) {
            // THEN PUSH THE LETTER TO CORRECT LETTERS
            correct_letters.push(letter);

            // UPDATE DISPLAY
            displayWord(selected_word);
          } else {
            // WHEN WE ALREADY HAVE THE LETTER IN CORRECT LETTERS
            showNotification();
          }
        } else {
          // WRONG LETTERS
          // CHECK IF WE ALREADY HAVE THE LETTER IN WRONG LETTERS. SHOULD NOT!
          if (!wrong_letters.includes(letter)) {
            // INSERT THE LETTER IN WRONG LETTERS
            wrong_letters.push(letter);
            console.log("wrong_letters: ", wrong_letters);
            // UPDATE WRONG LETTER
            updateWrongLetterEl();
          } else {
            // WHEN WE ALREADY HAVE THE LETTER IN WRONG LETTERS
            showNotification();
          }
        }
      }
    });
  });
}

function updateWrongLetterEl() {
  // UPDATE WRONG LETTER ELEMENT
  wrong_letters_element.innerHTML = `
  ${wrong_letters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrong_letters.map(letter => {
    return `<span>${letter}</span>`;
  })}`;

  // ADD A FIGURE PART
  figure_parts.forEach((part, index) => {
    const error_num = wrong_letters.length;
    if (error_num > index) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // FIGURE IS COMPLETED AND GAME OVER
  if (wrong_letters.length >= 6) {
    final_message.innerText = "You have failed:(";
    popup_container.style.display = "flex";
  }
}

function showNotification() {
  console.log("notification");
  notification_container.classList.add("show");

  // PULL IT DOWN IN ONE SEC.
  setTimeout(() => {
    notification_container.classList.remove("show");
  }, 2000);
}

function displayPopup() {
  // ANSWER IN ONE SINGLE LINE
  const answer_display_wo_newline = answer_display.innerText.replace(/\n/g, "");
  console.log("answer_w/o_newline: ", answer_display_wo_newline);

  if (answer_display_wo_newline === selected_word) {
    final_message.innerText = "Congrats, You won!";
    popup_container.style.display = "flex";
  }
}

function getHint(data) {
  hint.innerHTML = `${
    data.results == null ? "no hint available" : data.results[0].definition
  }`;
}

startGame();

play_btn.addEventListener("click", () => {
  startGame();
});
