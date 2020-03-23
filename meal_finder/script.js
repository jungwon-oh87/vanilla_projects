const search_button = document.getElementById("search_button");
const search_el = document.getElementById("search");
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
        result_heading.innerHTML = `<p>Sorry, we can't find any result for ${search_word}</p>`;
      } else {
        result_heading.innerHTML = `<p>We have some results for '${search_word}'</p>`;
        meals_el.innerHTML = data.meals
          .map(meal => {
            return `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"></img>
            <div class="meal_info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
          </div>`;
          })
          .join("");
      }
      console.log(data);
    });
}

search_button.addEventListener("click", searchMeal);
