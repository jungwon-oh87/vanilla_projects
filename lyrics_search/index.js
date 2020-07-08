const searchInputEl = document.getElementById("search_input");
const formEl = document.getElementById("form");
const resultEl = document.getElementById("result");
const moreEl = document.getElementById("more");

const apiUrl = "https://api.lyrics.ovh";

getInput = (e) => {
  e.preventDefault();
  const input = searchInputEl.value.trim();
  console.log(input);

  searchSongs(input);
};

searchSongs = async (input) => {
  const res = await fetch(`${apiUrl}/suggest/${input}`);
  const data = await res.json();
  console.log("data: ", data);

  displayData(data);
};

getMoreSongs = async (url) => {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  console.log("next data: ", data);
  displayData(data);
};

getLyrics = async (artist, title) => {
  const res = await fetch(`${apiUrl}/v1/${artist}/${title}`);
  const lyrics = await res.json();
  console.log(lyrics);
};

displayData = (data) => {
  resultEl.innerHTML = `
        <ul class="songs">
            ${data.data
              .map(
                (item) =>
                  `<li>
                    <span>
                        <strong>${item.artist.name}</strong>
                        -
                        ${item.title}
                    </span>
                     <button class="lyrics_button" data_artist="${item.artist.name}" data_title="${item.title}">Get Lyrics</button>
                    </li>`
              )
              .join("")}
        </ul>
    `;
  if (data.next || data.prev) {
    moreEl.innerHTML = `
    ${
      data.prev
        ? `<button class='nav_button' onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class='nav_button' onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }
    `;
  }
};

formEl.addEventListener("submit", getInput);
resultEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const artist = e.target.getAttribute("data_artist");
    const title = e.target.getAttribute("data_title");
    console.log("artist: ", artist);
    console.log("title: ", title);
    getLyrics(artist, title);
  }
});
