const search_button = document.getElementById("search_button");
const search_el = document.getElementById("search");
const form = document.getElementById("form");
// const search_word = search_el.value; // find out why it doesn't work
const result_heading = document.getElementById("result_heading");
const meals_el = document.getElementById("meals");

function searchMeal(e) {
  e.preventDefault();
  const search_word = search_el.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_word}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.meals === null) {
        result_heading.innerHTML = `<h3>Sorry, we can't find any result for ${search_word}</h3>`;
      } else {
        result_heading.innerHTML = `<h3>We have some results for '${search_word}'</h3>`;
        meals_el.innerHTML = data.meals
          .map(meal => {
            return `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"></img>
              <div class="meal_info" meal-id="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
          </div>`;
          })
          .join("");
      }
      console.log("first fetch... ", data);
    });
}

// fetch meal by id
function getMealById(meal) {
  const ingredients = [];

  // const meal_id = meal[]
}

// Event listener
form.addEventListener("submit", searchMeal);

meals_el.addEventListener("click", e => {
  const meal_info = e.path.find(item => {
    if (item.classList.contains("meal_info")) {
      return item;
    } else {
      return false;
    }
  });
  if (meal_info) {
    const meal_id = meal_info.getAttribute("meal-id");
    console.log(meal_id);
  }
  // getMealById(meal);
});
