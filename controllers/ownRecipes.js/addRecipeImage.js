const recipeImage = (req, res) => {
    const response = req.file.path;
    return res.status(200).json({ response });
};
module.exports = recipeImage;