const Recipe = require('../../models/recipe');

const ownRecipesGetById = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipes = await Recipe.find({ createdBy: userId }).exec();
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = ownRecipesGetById;