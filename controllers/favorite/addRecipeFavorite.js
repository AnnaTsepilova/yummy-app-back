const Ingredients = require("../../models/ingredient");
const Recipe = require("../../models/recipe");

const { NotFound } = require("http-errors");

const addRecipeFavorite = async (req, res) => {
  const ingredientsList = await Recipe.find();
  if (!ingredientsList) {
    throw new NotFound(`ingridients not found`);
  }
  return res.status(200).json(ingredientsList);
};
module.exports = addRecipeFavorite;
