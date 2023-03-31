const Recipe = require("../../models/recipe");

const { NotFound } = require("http-errors");

const addRecipeFavorite = async (req, res) => {
  const { id } = req.params;

  const updateRecipe = await Recipe.findOneAndUpdate(
    { _id: id },
    { $push: { favorites: req.user.id } }
  );
  if (!updateRecipe) {
    throw new NotFound(`recipe not found`);
  }
  return res.status(200).json(updateRecipe);
};
module.exports = addRecipeFavorite;
