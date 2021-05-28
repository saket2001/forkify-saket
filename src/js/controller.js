import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/recipesResult.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/BookmarksView.js';

///////////////////////////////////s
// console.log(Fraction());

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

    BookmarksView.render(model.state.bookmarks);
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

const controlServings = function (newServings) {
  // update serving and ing data in model
  model.updateServings(newServings);
  // update recipe view
  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // delete bookmark
  else model.deleteBookmark(model.state.recipe.id);
  // update view
  RecipeView.update(model.state.recipe);
  // render bookmarks
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  // render bookmarks
  BookmarksView.render(model.state.bookmarks);
};

const init = function () {
  console.log('Welcome to our application fellow developer');
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerRender(controlSearchRecipes);
  paginationView.addHandlerClick(controlPagination);
};
init();
