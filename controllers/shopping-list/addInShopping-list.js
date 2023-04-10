const { BadRequest } = require('http-errors');
const Ingredients = require('../../models/ingredient');
const User = require('../../models/user');
const addItemInList = async (req, res) => {
    const { id } = req.user;
    if (!req.body) {
        throw new BadRequest('Need Body');
    }
    const ingrName = Object.keys(req.body)[0];
    const ingrCount = Object.values(req.body)[0];
    const user = await User.findById(id).select({ shopingList: 1 });
    const shoppingList = user.shopingList.find(item => item.id.toString() === ingrName && item.measure === ingrCount);
    if (shoppingList) {
        if (!shoppingList.recipesId.includes(req.query.recipeId)) {
            shoppingList.recipesId.push(req.query.recipeId);
            await user.save();
        }
        return res.status(200).json(user.shopingList);
    } else {
        const ingr = await Ingredients.findById(ingrName).select({ ttl: 1, thb: 1 });
        const ingrToShoppingList = {
            ttl: ingr.ttl,
            thb: ingr.thb,
            id: ingr._id,
            recipesId: [req.query.recipeId],
            measure: ingrCount
        };
        user.shopingList.push(ingrToShoppingList);
        await user.save();
        const shopingList = user.shopingList;
        return res.status(200).json({ shopingList });
    }
}



module.exports = addItemInList;