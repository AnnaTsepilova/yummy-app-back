const { BadRequest } = require('http-errors');
const Ingredients = require('../../models/ingredient');
const User = require('../../models/user');
const addItemInList = async (req, res) => {
    const { id } = req.user;
    if (!req.body) {
        throw new BadRequest('Need Body');
    }
    const ingrName = Object.keys(req.body).join('');
    const ingrCount = Object.values(req.body).join('');
    const user = await User.findById(id);
    const ingr = await Ingredients.findOne({ _id: ingrName }).select({ ttl: 1, thb: 1 });
    const recipesId = await user.shopingList.filter(item => item.id.toString() === ingrName).flatMap(item => item.recipesId);
    const check = recipesId.filter(item => item === req.query.recipeId);
    if (check.length === 0) {
        recipesId.push(req.query.recipeId)
    }
    const ingrToShoppingList = {
        ttl: ingr.ttl,
        thb: ingr.thb,
        id: ingr._id,
        recipesId,
        measure: ingrCount
    }
    const addedToShoppingList = await User.findOneAndUpdate(
        { _id: id },
        { $addToSet: { shopingList: ingrToShoppingList } },
        { new: true, projection: { shopingList: 1 } }
    );

    return res.status(200).json(addedToShoppingList);
}



module.exports = addItemInList;