const Recipe = require("../../models/recipe");


const getMainPage = async (req, res) => {
    const limitNumber = 4;
    const category = ['Breakfast', 'Miscellaneous', 'Vegan', 'Dessert'];
    let result = {};
    for (let i = 0; i < category.length; i++) {
        const recipes = await Recipe.find({ category: category[i] }).select({ title: 1, preview: 1 }).limit(limitNumber);
        result[category[i]] = recipes;
    }
    return res.status(200).json(result);
}


module.exports = getMainPage;