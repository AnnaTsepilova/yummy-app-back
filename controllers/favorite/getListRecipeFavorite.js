const Recipe = require("../../models/recipe");
const { NotFound } = require("http-errors");

const getListRecipeFavorite = async (req, res) => {
  const recipeList = await Recipe.find({ favorites: req.user._id });
  if (!recipeList) {
    throw new NotFound(`ingridients not found`);
  }
  return res.status(200).json(recipeList);
};
module.exports = getListRecipeFavorite;
