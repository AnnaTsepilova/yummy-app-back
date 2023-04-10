const getCategoryList = require('./categoryList');
const getMainPage = require('./mainPage')
const getRecipesByCategory = require('./recipesByCategory')
const getRecipeById = require('./recipeById')
const searchRecipe = require('./searchRecipe')
const { addRecipe, getUserRecipe, removeRecipe, recipeImage } = require('./ownRecipes')
module.exports = {
    getCategoryList,
    getMainPage,
    getRecipesByCategory,
    getRecipeById,
    searchRecipe,
    addRecipe,
    removeRecipe,
    getUserRecipe,
    recipeImage
}