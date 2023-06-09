const Ingredients = require("../../models/ingredient");
const Recipe = require("../../models/recipe");

const searchRecipe = async (req, res) => {
    const limitNumber = 12;
    const { title } = req.query;
    let { page = 1, limit = limitNumber, skip = 0 } = req.query;
    limit = parseInt(limit) > limitNumber ? limitNumber : parseInt(limit);
    skip = parseInt(page) === 1 ? 0 : parseInt(page) * limit - limitNumber;

    if (title) {
        const regexTitle = new RegExp(req.query.title, "i");
        const countPromise = Recipe.countDocuments({ title: regexTitle });
        const resultsPromise = Recipe.find(
            { title: regexTitle },
            { title: 1, preview: 1 }
        )
            .skip(skip)
            .limit(limitNumber)
            .lean()
            .exec();
        const [totalHits, results] = await Promise.all([
            countPromise,
            resultsPromise,
        ]);
        const hits = results.length;
        return res.status(200).json({ results, totalHits, hits });
    }
    const ingr = await Ingredients.findOne({
        ttl: { $regex: req.query.ingredient, $options: "i" },
    });
    if (!ingr) {
        return res.status(200).json({ results: [], totalHits: 0, hits: 0 });
    }
    const pipeline = [
        {
            $match: { ingredients: { $elemMatch: { id: ingr._id } } },
        },
        {
            $facet: {
                metadata: [{ $count: "totalHits" }],
                results: [
                    { $unwind: "$ingredients" },
                    { $match: { "ingredients.id": ingr._id } },
                    { $skip: skip },
                    { $limit: limitNumber },
                ],
            },
        },
        {
            $project: {
                results: 1,
                totalHits: { $arrayElemAt: ["$metadata.totalHits", 0] },
                hits: { $size: "$results" },
            },
        },
    ];

    const result = await Recipe.aggregate(pipeline);

    return res.status(200).json(result[0]);
};

module.exports = searchRecipe;
