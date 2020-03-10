const burger_btn = document.getElementById("burger_btn");
const sign_up_btn = document.getElementById("sign_up_btn");
const modal_container = document.getElementById("modal_container");
const modal_exit_btn = document.getElementById("modal_exit_btn");

burger_btn.addEventListener("click", () => {
  document.body.classList.toggle("nav-display");
});

sign_up_btn.addEventListener("click", () => {
  //   console.log("clicked");
  modal_container.classList.add("modal_display");
});

modal_exit_btn.addEventListener("click", () => {
  modal_container.classList.remove("modal_display");
});

window.addEventListener("click", e => {
  // e.target == modal_container
  //   console.log(e.target);
  e.target == modal_container
    ? modal_container.classList.remove("modal_display")
    : false;
});
