const Recipe = require("../../models/recipe");
const { NotFound } = require("http-errors");

const getListRecipeFavorite = async (req, res) => {
  const limitNumber = 4;
  let {
    page = 1,
    limit = limitNumber,
    skip = 0,
  } = req.query;
  if (req.query.all === 'true') {
    const results = await Recipe.find({ favorites: req.user._id })
    return res.status(200).json({ results });
  }
  limit = parseInt(limit) > limitNumber ? limitNumber : parseInt(limit);
  skip = parseInt(page) === 1 ? 0 : parseInt(page) * limit - limitNumber;
  const pagination = await Recipe.find({ favorites: req.user._id });
  if (!pagination) {
    throw new NotFound(`ingridients not found`);
  }
  const totalHits = pagination.length;
  const results = await Recipe.find({ favorites: req.user._id }).skip(skip).limit(limit)
  const hits = results.length;
  return res.status(200).json({ results, totalHits, hits });
};
module.exports = getListRecipeFavorite;
