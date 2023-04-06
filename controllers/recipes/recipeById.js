const Recipe = require("../../models/recipe");
const { NotFound } = require('http-errors');
const Ingredients = require("../../models/ingredient");
const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const recipeFromDb = await Recipe.findOne({ _id: id });
    const newIngredients = [];
    const ingrs = recipeFromDb.ingredients;
    for (let i = 0; i < ingrs.length; i++) {
        const ingrInfo = await Ingredients.findOne({ _id: ingrs[i].id });
        const ingr = {
            _id: ingrInfo._id,
            ttl: ingrInfo.ttl,
            thb: ingrInfo.thb,
            measure: recipeFromDb.ingredients[i].measure
        }
        newIngredients.push(ingr);
    }
    if (!recipeFromDb) {
        throw new NotFound(`recipe with id ${id} not found`)
    }
    const recipe = {
        _id: recipeFromDb._id,
        title: recipeFromDb.title,
        category: recipeFromDb.category,
        area: recipeFromDb.area,
        instructions: recipeFromDb.instructions,
        description: recipeFromDb.description,
        preview: recipeFromDb.preview,
        time: recipeFromDb.time,
        favorites: recipeFromDb.favorites,
        likes: recipeFromDb.likes,
        ingredients: newIngredients,
        createdAt: recipeFromDb.createdAt,
        updatedAt: recipeFromDb.updatedAt

    }
    return res.status(200).json(recipe);
}

module.exports = getRecipeById;