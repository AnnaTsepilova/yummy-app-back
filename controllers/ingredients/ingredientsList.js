const Ingredients = require("../../models/ingredient");
const { NotFound } = require("http-errors");

const getIngredientsList = async (req, res) => {
  const ingredientsList = await Ingredients.find();
  if (!ingredientsList) {
    throw new NotFound(`ingridients not found`);
  }
  return res.status(200).json(ingredientsList);
};

module.exports = getIngredientsList;
