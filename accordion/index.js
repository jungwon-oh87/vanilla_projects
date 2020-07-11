const accordionEl = document.getElementById("accordion");
const panels = document.getElementsByClassName("panel");
const accordionBtns = document.querySelectorAll(".accordion_button");
console.log("accordion buttons: ", accordionBtns);

accordionEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("button clicked: ", e.target);
    e.target.classList.toggle("clicked");
    const panelEl = e.target.nextElementSibling;
    panelEl.classList.toggle("activated");

    if (panelEl.classList.contains("activated")) {
      panelEl.style.maxHeight = panelEl.scrollHeight + "px";
    } else {
      panelEl.style.maxHeight = "0px";
    }
  }
});
