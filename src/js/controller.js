import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

/////////////////////////////////////

// if (module.hot) {
//   module.hot.accept;
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //rendering the spinner
    recipeView.renderSpinner();

    //render recipe with the selected class
    resultsView.render(model.getSearchresultsPage());

    bookmarkView.update(model.state.bookmark);

    //loading the recipe
    await model.loadRecipe(id);

    // rendering the recipe
    recipeView.render(model.state.recipe);

    // controlServings();
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get search query
    const query = searchView.getQuery();

    if (!query) return;
    //load search results
    await model.loadSearchResults(query);

    //render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchresultsPage());

    //render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchresultsPage(goToPage));

  //render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe serving in state
  model.updateServings(newServings);

  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update the recipe view
  recipeView.update(model.state.recipe);

  //add the recipe as markup on the bookmark
  bookmarkView.render(model.state.bookmark);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);
};

const init = function () {
  bookmarkView.addHandlerBookmark(controlBookmark);
  recipeView.renderHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
