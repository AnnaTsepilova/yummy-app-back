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
        const pagination = await Recipe.find({ title: { $regex: req.query.title, $options: "i" } }).select({ title: 1, preview: 1 });
        const finded = await Recipe.find({ title: { $regex: req.query.title, $options: "i" } }).select({ title: 1, preview: 1 }).skip(skip).limit(limitNumber);
        const totalHits = pagination.length;
        const hits = finded.length;
        return res.status(200).json({ finded, totalHits, hits });
    }
    const ingredient = await Ingredients.findOne({ ttl: { $regex: req.query.ingredient, $options: "i" } }).select({ _id: 1 });
    if (!ingredient) {
        throw new NotFound(`ingridient ${req.query.ingredient} not found`);
    }
    const pagination = await Recipe.find({
        ingredients: { $elemMatch: { id: ingredient._id } },
    })
    const finded = await Recipe.find({
        ingredients: { $elemMatch: { id: ingredient._id } },
    }).select({ title: 1, preview: 1 }).skip(skip).limit(limitNumber);
    const totalHits = pagination.length;
    const hits = finded.length;
    return res.status(200).json({ finded, totalHits, hits });
}

module.exports = searchRecipe;