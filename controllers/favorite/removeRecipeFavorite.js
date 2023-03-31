const Recipe = require("../../models/recipe");
const { NotFound } = require("http-errors");

const removeRecipeFavorite = async (req, res) => {
  //пока заглушка
  const { id } = req.params;
  const recipe = await Recipe.findOne({ _id: id });
  if (!recipe) {
    throw new NotFound(`ingridients not found`);
  }
  return res.status(200).json(recipe);
};
module.exports = removeRecipeFavorite;
