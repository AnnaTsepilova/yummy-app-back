const Recipe = require('../../models/recipe');

const AddRecipe = async (req, res) => {
  try {
    const { title, category, area, instructions, description, thumb, preview, time, popularity, preparation, favorites, likes, youtube, tags, ingredients } = req.body;
    const owner = req.user._id;

    const recipe = await Recipe.create({
      title,
      description,
      category,
      preparation,
      time,
      ingredients,
      thumb,
      preview,
      area,
      instructions,
      popularity,
      favorites,
      likes,
      youtube,
      tags,
      owner
    });

    res.status(201).json({
      status: 'success',
      data: {
        recipe,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = AddRecipe;
