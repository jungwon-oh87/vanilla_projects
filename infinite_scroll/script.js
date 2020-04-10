const post_container = document.getElementById("post-container");
const loading_dots = document.getElementById("loading-dots");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch API
async function getData() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// DisplayDOM
async function displayDOM() {
  const data = await getData();

  data.forEach((d) => {
    const div_el = document.createElement("div");
    div_el.classList.add("post");
    div_el.setAttribute("id", "post");
    div_el.innerHTML = `
        <div class="post-id">${d.id}</div>
        <h2 class="post-title">${d.title}</h2>
        <div class="post-body">${d.body}</div>
    `;
    post_container.appendChild(div_el);
  });
}

// Display loading dots
function displayLoading() {
  loading_dots.classList.add("show-dots");
  setTimeout(() => {
    loading_dots.classList.remove("show-dots");
    page++;
    displayDOM();
  }, 1000);
}

// Filter post simultaneously
function handleFilter(e) {
  const input = e.target.value;
  const posts = post_container.querySelectorAll(".post");

  posts.forEach((p) => {
    const p_title = p.querySelector(".post-title").textContent;
    const p_body = p.querySelector(".post-body").textContent;

    if (p_title.indexOf(input) > -1 || p_body.indexOf(input) > -1) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

displayDOM();

// Handle with scrolling to the bottom
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    displayLoading();
  }
});

filter.addEventListener("input", handleFilter);
