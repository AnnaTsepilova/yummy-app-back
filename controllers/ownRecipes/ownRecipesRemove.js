const Recipe = require('../../models/recipe');

const ownRecipesRemove = () => async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this recipe' });
    }

    await recipe.remove();

    res.json({ message: 'Recipe successfully deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = ownRecipesRemove;

