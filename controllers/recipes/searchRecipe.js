const { BadRequest, NotFound } = require('http-errors');
const Ingredients = require('../../models/ingredient');
const Recipe = require('../../models/recipe');
const searchRecipe = async (req, res) => {
    const limitNumber = 12;
    let {
        page = 1,
        limit = limitNumber,
        skip = 0,
    } = req.query;
    limit = parseInt(limit) > limitNumber ? limitNumber : parseInt(limit);
    skip = parseInt(page) === 1 ? 0 : parseInt(page) * limit - limitNumber;
    if (req.query.title) {
        const regexTitle = new RegExp(req.query.title, "i");
        const countPromise = Recipe.countDocuments({ title: regexTitle });
        const resultsPromise = Recipe.find({ title: regexTitle }, { title: 1, preview: 1 })
            .skip(skip)
            .limit(limitNumber)
            .lean()
            .exec();
        const [totalHits, results] = await Promise.all([countPromise, resultsPromise]);
        const hits = results.length;
        return res.status(200).json({ results, totalHits, hits });
    }
    const regexTitle = new RegExp(req.query.ingredient, "i");
    const countPromise = Recipe.countDocuments({ title: regexTitle });
    const resultsPromise = Recipe.find({ title: regexTitle }, { title: 1, preview: 1 })
        .skip(skip)
        .limit(limitNumber)
        .lean()
        .exec();
    const [totalHits, results] = await Promise.all([countPromise, resultsPromise]);
    const hits = results.length;
    return res.status(200).json({ results, totalHits, hits });
}

module.exports = searchRecipe;