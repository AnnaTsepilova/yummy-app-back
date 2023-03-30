const getCategoryList = require('./categoryList');
const getMainPage = require('./mainPage')
const getRecipesByCategory = require('./recipesByCategory')
const getRecipeById = require('./recipeById')
const searchRecipe = require('./searchRecipe')
module.exports = {
    getCategoryList,
    getMainPage,
    getRecipesByCategory,
    getRecipeById,
    searchRecipe
}