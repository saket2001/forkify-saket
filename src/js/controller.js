import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/recipesResult.js';
import paginationView from './views/paginationView.js';

// import { Fraction } from '/fractional';
///////////////////////////////////s
const emptyMessage = document.querySelector('.message');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    // getting recipe id from search bar
    const id = window.location.hash.slice(1);
    // guard clause
    if (!id) return;
    // loading the spinner
    RecipeView.renderSpinner();
    await model.loadRecipe(id);
    // html markup
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderErrorMsg();
  }
};

const controlSearchRecipes = async function () {
  try {
    // render spinner
    ResultsView.renderSpinner();
    // get user query
    const query = SearchView.getQuery();
    if (!query) return;

    // load data in model
    await model.loadSearchRecipe(query);

    // display results
    ResultsView.render(model.resultsPerPage(1));

    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  // display results
  ResultsView.render(model.resultsPerPage(gotoPage));

  // render pagination
  paginationView.render(model.state.search);
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerRender(controlSearchRecipes);
  paginationView.addHandlerClick(controlPagination);
  console.log(BUG);
};
init();
