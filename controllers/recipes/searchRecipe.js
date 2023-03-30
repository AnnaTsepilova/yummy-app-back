const { BadRequest } = require('http-errors');
const Recipe = require('../../models/recipe');
const searchRecipe = async (req, res) => {
    const { value, flag } = req.body;
    if (!value && !flag) {
        throw new BadRequest('missing fields , need {value,flag}')
    }
    const limitNumber = 12;
    let {
        page = 1,
        limit = limitNumber,
        skip = 0,
    } = req.query;
    limit = parseInt(limit) > limitNumber ? limitNumber : parseInt(limit);
    skip = parseInt(page) === 1 ? 0 : parseInt(page) * limit - limitNumber;
    if (flag === 'title') {
        const pagination = await Recipe.find({ title: { $regex: new RegExp(`${value}`, 'i') } }).select({ title: 1, preview: 1 });
        const finded = await Recipe.find({ title: { $regex: new RegExp(`${value}`, 'i') } }).select({ title: 1, preview: 1 }).skip(skip).limit(limitNumber);
        const totalHits = pagination.length;
        const hits = finded.length;
        return res.status(200).json({ finded, totalHits, hits });
    }
    // const pagination = await Recipe.find({ title: { $regex: new RegExp(`${value}`, 'i') } }).select({ title: 1, preview: 1 });
    // const finded = await Recipe.find({ title: { $regex: new RegExp(`${value}`, 'i') } }).select({ title: 1, preview: 1 }).skip(skip).limit(limitNumber);
    // const totalHits = pagination.length;
    // const hits = finded.length;
    // return res.status(200).json({ finded, totalHits, hits });
}

module.exports = searchRecipe;