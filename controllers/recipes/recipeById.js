const Recipe = require("../../models/recipe");
const { NotFound } = require('http-errors');
const Ingredients = require("../../models/ingredient");
const getRecipeById = async (req, res) => {
    const { id } = req.params;

    const recipeFromDb = await Recipe.findOne({ _id: id }).select('title category area instructions description preview time favorites likes createdAt updatedAt ingredients').lean();
    if (!recipeFromDb) {
        throw new NotFound(`recipe with id ${id} not found`)
    }

    const ingredientIds = recipeFromDb.ingredients.map(ingr => ingr.id);
    const ingredients = await Ingredients.find({ _id: { $in: ingredientIds } }).select('_id ttl thb').lean();
    const newIngredients = recipeFromDb.ingredients.map((ingr, i) => ({
        _id: ingredients[i]._id,
        ttl: ingredients[i].ttl,
        thb: ingredients[i].thb,
        measure: ingr.measure
    }));
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