const getCategoryList = require("./categoryList");
const getMainPage = require("./mainPage");
const getRecipesByCategory = require("./recipesByCategory");
const getRecipeById = require("./recipeById");
const searchRecipe = require("./searchRecipe");
const getPopularRecipes = require('./popular-recipes')
module.exports = {
    getCategoryList,
    getMainPage,
    getRecipesByCategory,
    getRecipeById,
    searchRecipe,
    getPopularRecipes
};
