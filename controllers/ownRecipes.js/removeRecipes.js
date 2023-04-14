const { NotFound } = require("http-errors");
const Recipe = require("../../models/recipe");
const removeRecipe = async (req, res) => {
    const { id } = req.params;
    const deleteRecipe = await Recipe.findOneAndRemove({ _id: id });
    if (!deleteRecipe) {
        throw new NotFound(`recipe with id ${id} not found`);
    }
    return res.status(200).json(deleteRecipe);
};
module.exports = removeRecipe;