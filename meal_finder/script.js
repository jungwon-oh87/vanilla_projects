const search_button = document.getElementById("search_button");
const search_el = document.getElementById("search");
const search_word = search_el.value;

function searchMeal(e) {
  e.preventDefault();
  //   fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
  console.log("search word: ", search_word);
}

search_button.addEventListener("click", searchMeal);
