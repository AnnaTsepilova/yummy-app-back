const { NotFound } = require('http-errors');
const User = require("../../models/user");

const removeItemFromList = async (req, res) => {
    const { id } = req.user;
    const { shoppingListId } = req.params;
    const { recipeId } = req.query;
    const user = await User.findById(id);
    if (recipeId) {
        const recipesId = await user.shopingList.filter(item => item.id.toString() === shoppingListId.toString()).flatMap(item => item.recipesId)
        const recipesIdIndex = await recipesId.findIndex(item => item === recipeId);
        if (recipesIdIndex === -1) {
            throw new NotFound(`id ${shoppingListId} not found`);
        }
        const shoppingList = await user.shopingList.filter(item => item.recipesId.includes(recipeId));
        const shopingListIndex = await shoppingList.findIndex(item => item.measure === req.query.measure);
        await shoppingList.splice(shopingListIndex, 1)
        await User.findOneAndUpdate({ _id: id }, { shopingList: shoppingList }, { new: true })
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