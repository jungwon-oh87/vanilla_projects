const search_button = document.getElementById("search_button");
const random_button = document.getElementById("random_button");
const search_el = document.getElementById("search");
const form = document.getElementById("form");
// const search_word = search_el.value; // find out why it doesn't work
const result_heading = document.getElementById("result_heading");
const meals_el = document.getElementById("meals");
const single_meal = document.getElementById("single_meal");

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
                <h2>${meal.strMeal}</h2>
              </div>
          </div>`;
          })
          .join("");
      }
      console.log("first fetch... ", data);
    });
}

// fetch meal by id
function getMealById(meal_id) {
  const ingredients = [];
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)
    .then(res => res.json())
    .then(data => {
      for (let i = 1; i <= 20; i++) {
        if (data.meals[0][`strIngredient${i}`]) {
          ingredients.push(
            `${data.meals[0][`strIngredient${i}`]} - ${
              data.meals[0][`strMeasure${i}`]
            }`
          );
        } else {
          break;
        }
      }
      // console.log("ingredients: ", ingredients);
      single_meal.innerHTML = `
      <div class="single_meal">
        <h2>${data.meals[0].strMeal}</h2>
        <img src="${data.meals[0].strMealThumb}" />
        <div class="main">
        <div class="main_title">
          <h3>Category: ${data.meals[0].strCategory}</h3>
          <h3>Origin: ${data.meals[0].strArea}</h3>
        </div>
          <p>Direction: ${data.meals[0].strInstructions}</p>
          <h3>Ingredients</h3>
          <ul>
            ${ingredients.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>
      </div>`;
    });
}

function getRandom() {
  // clear meals and heading
  search_el.value = "";
  result_heading.innerHTML = "";
  meals_el.innerHTML = "";
  single_meal.innerHTML = "";
  // fetch API
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => getMealById(data.meals[0].idMeal));
}

// Event listener
form.addEventListener("submit", searchMeal);
random_button.addEventListener("click", getRandom);

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
    getMealById(meal_id);
  }
});
