const prev_nav = document.getElementById("prev_nav");
const next_nav = document.getElementById("next_nav");

let slide_index = 0;

const currentSlide = (num) => {
  slide_index = num;
  showSlides(num);
};

const showSlides = (num) => {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (num >= slides.length) {
    slide_index = 0;
  }
  if (num < 0) {
    slide_index = slides.length - 1;
  }

  // reset the slides to be invisible
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // reset dots
  for (let i = 0; i < dots.length; i++) {
    // check this again
    dots[i].className = dots[i].className.replace("active", "");
  }

  slides[slide_index].style.display = "block";
  dots[slide_index].classList.add("active");
};

showSlides(slide_index);
prev_nav.addEventListener("click", () => {
  slide_index--;
  showSlides(slide_index);
});

next_nav.addEventListener("click", () => {
  slide_index++;
  showSlides(slide_index);
});
