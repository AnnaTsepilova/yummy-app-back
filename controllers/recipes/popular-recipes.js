const Recipe = require("../../models/recipe");
const { NotFound } = require("http-errors");

const getPopularRecipes = async (req, res) => {
    const recipesSorted = await Recipe.find()
        .limit(4)
        .sort({ favorites: -1 });

    if (!recipesSorted) {
        throw new NotFound(`recipes not found`);
    }
    const recipes = recipesSorted.sort(
        (a, b) => b.favorites.length - a.favorites.length
    );
    return res.status(200).json(recipes);
};

module.exports = getPopularRecipes;