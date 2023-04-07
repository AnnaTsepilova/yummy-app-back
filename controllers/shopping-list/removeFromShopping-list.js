const { NotFound } = require('http-errors');
const User = require("../../models/user");

const removeItemFromList = async (req, res) => {
    const { id } = req.user;
    const { shoppingListId } = req.params;
    const { recipeId } = req.query;
    const user = await User.findById(id);
    const newArr = []
    if (recipeId) {
        const recipesId = await user.shopingList.filter(item => item.id.toString() === shoppingListId.toString()).flatMap(item => item.recipesId)
        const recipesIdIndex = await recipesId.findIndex(item => item === recipeId);
        if (recipesIdIndex === -1) {
            throw new NotFound(`id ${shoppingListId} not found`);
        }
        await recipesId.splice(recipesIdIndex, 1);
        const shoppingList = await user.shopingList.filter(item => item.id.toString() === shoppingListId.toString()).flatMap(item => item);
        for (let i = 0; i < shoppingList.length; i++) {
            const ingrToShoppingList = {
                ttl: shoppingList[i].ttl,
                thb: shoppingList[i].thb,
                id: shoppingList[i].id,
                recipesId,
                measure: shoppingList[i].measure.split(' ')[0] ? parseInt(shoppingList[i].measure.split('')[0]) - parseInt(req.query.measure.split(' ')[0]) + " " + shoppingList[i].measure.split(' ')[1] : parseInt(shoppingList[i].measure.split('')[0]) - parseInt(req.query.measure.split(' ')[0]) + ''
            }
            newArr.push(ingrToShoppingList);
        }
        await User.findOneAndUpdate({ _id: id }, { shopingList: newArr }, { new: true })
        return res.status(200).json({ message: "success" });
    }
    const findShopingListIndex = await user.shopingList.findIndex(item => item.id.toString() === shoppingListId.toString() && item.measure === req.query.measure);
    if (findShopingListIndex === -1) {
        throw new NotFound(`id ${shoppingListId} not found`);
    }
    await user.shopingList.splice(findShopingListIndex, 1);
    await User.findOneAndUpdate({ _id: id }, { shopingList: user.shopingList }, { new: true })
    return res.status(200).json({ message: "success" });
}

module.exports = removeItemFromList;