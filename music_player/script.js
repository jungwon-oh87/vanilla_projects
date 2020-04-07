const audio = document.getElementById("audio");
const prev_btn = document.getElementById("prev");
const play_btn = document.getElementById("play");
const next_btn = document.getElementById("next");

const img = document.getElementById("image");
const song_title = document.getElementById("song_title");

const container = document.getElementById("container");

play_btn.addEventListener("click", playSong);

function playSong() {
  container.classList.add("play");
  audio.play();
}
