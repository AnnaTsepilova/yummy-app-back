const Recipe = require("../../models/recipe");

const { NotFound } = require("http-errors");

const getPopularRecipe = async (req, res) => {
  const recipes = await Recipe.find()
    .limit(4)
    .sort({ favorites: -1 });

  if (!recipes) {
    throw new NotFound(`recipes not found`);
  }
  return res.status(200).json(recipes);
};

module.exports = getPopularRecipe;
