const Recipe = require("../../models/recipe");

const getRecipesByCategory = async (req, res) => {
  const limitNumber = 8;
  const { category } = req.params;
  const categoryRequest =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const recipes = await Recipe.find({ category: categoryRequest })
    .select({ title: 1, preview: 1 })
    .limit(limitNumber);
  return res.status(200).json(recipes);
};

module.exports = getRecipesByCategory;
