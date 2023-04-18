const Recipe = require("../../models/recipe");
const { NotFound } = require("http-errors");

const removeRecipeFavorite = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const updateRecipe = await Recipe.findOneAndUpdate(
    { _id: id, favorites: userId },
    { $pull: { favorites: userId } },
    {
      new: true,
    }
  );
  if (!updateRecipe) {
    throw new NotFound(`recipe not found`);
  }
  return res.status(200).json(updateRecipe);
};

module.exports = removeRecipeFavorite;
