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
                     <button class="lyrics_button">Get Lyrics</button>
                    </li>`
              )
              .join("")}
        </ul>
    `;
};

formEl.addEventListener("submit", getInput);
