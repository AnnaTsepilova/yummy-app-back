const Recipe = require("../../models/recipe");
const Ingredients = require("../../models/ingredient");
const { NotFound } = require("http-errors");

const getIngredients = async (req, res) => {
  const { ingredientTtl } = req.params;

  const ingredient = await Ingredients.findOne({
    ttl: { $regex: ingredientTtl, $options: "i" },
  });

  if (!ingredient) {
    throw new NotFound(`ingridient ${ingredientTtl} not found`);
  }

  const recipes = await Recipe.find({
    ingredients: { $elemMatch: { id: ingredient._id } },
  });

  if (!recipes) {
    throw new NotFound(`recipes with ${ingredientTtl} not found`);
  }
  return res.status(200).json(recipes);
};

module.exports = getIngredients;
