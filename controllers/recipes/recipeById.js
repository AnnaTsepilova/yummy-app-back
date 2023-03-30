const Recipe = require("../../models/recipe");
const { NotFound } = require('http-errors');
const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ _id: id });
    if (!recipe) {
        throw new NotFound(`recipe with id ${id} not found`)
    }
    return res.status(200).json(recipe);
}

module.exports = getRecipeById;