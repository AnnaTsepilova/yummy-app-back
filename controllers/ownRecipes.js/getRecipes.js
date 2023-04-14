const Recipe = require("../../models/recipe");
const getUserRecipe = async (req, res) => {
    const { id } = req.user;
    const limitNumber = 4;
    let { page = 1, limit = limitNumber, skip = 0 } = req.query;
    limit = parseInt(limit) > limitNumber ? limitNumber : parseInt(limit);
    skip = parseInt(page) === 1 ? 0 : parseInt(page) * limit - limitNumber;
    const pagination = await Recipe.find({ owner: id });
    const totalHits = pagination.length;
    const results = await Recipe.find({ owner: id })
        .skip(skip)
        .limit(limit);
    const hits = results.length;
    return res.status(200).json({ results, totalHits, hits });
};
module.exports = getUserRecipe;