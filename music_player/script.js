const audio = document.getElementById("audio");
const prev_btn = document.getElementById("prev");
const play_btn = document.getElementById("play");
const next_btn = document.getElementById("next");

const record_img = document.getElementById("image");
const song_title = document.getElementById("song_title");

const container = document.getElementById("container");

const progress_bar_container = document.getElementById("progress-container");
const progress_bar = document.getElementById("progress-bar");

const names = ["hey", "summer", "ukulele"];
let index = 0;

function loadSong(song) {
  audio.src = `assets/music/${song}.mp3`;
  record_img.src = `./assets/images/${song}.jpg`;
  song_title.innerText = song;
}

function handlePlay() {
  if (container.classList.contains("play")) {
    pauseSong();
  } else {
    playSong();
  }
}

function playSong() {
  container.classList.add("play");
  play_btn.innerHTML = `<i class="fas fa-pause"></i>`;
  audio.play();
}

function pauseSong() {
  container.classList.remove("play");
  play_btn.innerHTML = `<i class="fas fa-play"></i>`;
  audio.pause();
}

function playNext() {
  index++;
  // wrap it around
  if (index >= names.length) {
    index = 0;
  }
  loadSong(names[index]);
  playSong();
}

function playPrev() {
  index--;
  // wrap it around
  if (index < 0) {
    index = names.length - 1;
  }
  loadSong(names[index]);
  playSong();
}

function handleProgress(e) {
  let currentTime = e.srcElement.currentTime;
  let duration = e.srcElement.duration;
  let percentage = (currentTime / duration) * 100;

  progress_bar.style.width = `${percentage}%`;
}

function setProgressBar(e) {
  // console.log(this); this is same as event

  console.log(e.target.clientWidth);
  console.log(e.offsetX);

  const total_width = e.target.clientWidth;
  const click_position = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (click_position / total_width) * duration;
}

loadSong(names[0]);

// control button event listeners
play_btn.addEventListener("click", handlePlay);
next_btn.addEventListener("click", playNext);
prev_btn.addEventListener("click", playPrev);

// increase progress bar as it plays music
audio.addEventListener("timeupdate", handleProgress);

// when progress bar clicked, set music
progress_bar_container.addEventListener("click", setProgressBar);

// when a song ends, play next
audio.addEventListener("ended", playNext);
