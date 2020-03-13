const answer = document.getElementById("answer");
const hint = document.getElementById("hint");
const correct_letters = [];

// const words = ["hello", "programmer", "jungwon", "forward", "javascript"];

// const selectedWord = words[Math.floor(Math.random() * words.length)];

// function displayWord() {
//   answer.innerHTML = `<span class="letter">
//     ${selectedWord.split("")}
// </span>`;
// }
let newData = "test";
const url = "https://wordsapiv1.p.rapidapi.com/words/?random=true";

async function getAPI(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "eb70fdab9fmshcd990b979590c50p1a4acdjsnc2feb87bda92"
    }
  });
  return response.json();
}

getAPI(url).then(data => {
  setupBlanks(data);
});

function setupBlanks(data) {
  console.log(data);
  const words = data.word.split(" ");
  const first_word = words[0];
  console.log(first_word);

  first_word.split("").map(letter => {
    console.log(letter);
  });

  answer.innerHTML = `${first_word
    .split("")
    .map(letter => {
      // push each letter to correct_letters variable for test
      correct_letters.push(letter);

      // make blanks for # of the word
      return `<span class="letter">
        ${correct_letters.includes(letter) ? letter : ""}
        </span>`;
    })
    .join("")}`;

  getHint(data);
  console.log("answer: ", answer.innerHTML);
}

function getHint(data) {
  hint.innerHTML = `${
    data.results == null ? "no hint available" : data.results[0].definition
  }`;
}
