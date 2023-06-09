const { BadRequest } = require("http-errors");
const Ingredients = require("../../models/ingredient");
const Recipe = require("../../models/recipe");

const addRecipe = async (req, res) => {
    const { id } = req.user;

    const {
        title,
        description,
        category,
        cockingTime,
        ingredients,
        preparation,
    } = req.body;
    if (
        !title &&
        !description &&
        !category &&
        !cockingTime &&
        !ingredients &&
        !preparation
    ) {
        throw new BadRequest(
            'Need body {title,description,category,cockingTime,ingredients[{id:"messure"}],preparation}'
        );
    }
    const ingredientsIds = ingredients.map((item) => Object.keys(item).join(""));
    const ingredientsMessure = ingredients.map((item) =>
        Object.values(item).join("")
    );
    const tempArray = [];
    const ingredientsArray = [];
    for (let i = 0; i < ingredientsIds.length; i++) {
        const ingrIds = await Ingredients.findOne({
            _id: ingredientsIds[i],
        }).select({ _id: 1 });
        tempArray.push(ingrIds._id);
        const ingredients = {
            id: tempArray[i],
            measure: ingredientsMessure[i],
        };
        ingredientsArray.push(ingredients);
    }
    const newRecipe = {
        title,
        category,
        preview: req.body.recipeImage ? req.body.recipeImage : null,
        description,
        ingredients: ingredientsArray,
        time: cockingTime,
        preparation,
        owner: id,
    };

    await Recipe.create(newRecipe);
    return res.status(201).json({ message: "success" });
};
module.exports = addRecipe;