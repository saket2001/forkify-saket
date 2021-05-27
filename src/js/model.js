import { API_URL, RESULTSPERPAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTSPERPAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // console.log(data);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchRecipe = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    // console.log(state.search.results);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const resultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RESULTSPERPAGE;
  const end = page * RESULTSPERPAGE;

  return state.search.results.slice(start, end);
};

// loadSearchRecipe('pizza');
