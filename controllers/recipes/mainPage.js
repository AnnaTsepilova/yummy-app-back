const Recipe = require("../../models/recipe");


const getMainPage = async (req, res) => {
    const limitNumber = 4;
    const category = ['Breakfast', 'Miscellaneous', 'Vegan', 'Dessert'];
    const promises = category.map(cat => Recipe.find({ category: cat }).select({ title: 1, preview: 1 }).limit(limitNumber));
    const result = await Promise.all(promises);
    const data = category.reduce((acc, cat, index) => {
        acc[cat] = result[index];
        return acc;
    }, {});
    return res.status(200).json(data);
}



module.exports = getMainPage;