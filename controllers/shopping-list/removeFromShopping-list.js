const { NotFound } = require('http-errors');
const User = require("../../models/user");

const removeItemFromList = async (req, res) => {
    const { id } = req.user;
    const { shoppingListId } = req.params;
    const { recipeId } = req.query;
    const user = await User.findById(id);
    if (recipeId) {
        const shopingListIndex = await user.shopingList.findIndex(item => item.recipesId.includes(recipeId) && item.id.toString() === shoppingListId && item.measure === req.query.measure);
        await user.shopingList.splice(shopingListIndex, 1)
        const removedShopingList = await User.findOneAndUpdate({ _id: id }, { shopingList: user.shopingList }, { new: true }).select({ shopingList: 1 })
        return res.status(200).json(removedShopingList);
    }
    const findShopingListIndex = await user.shopingList.findIndex(item => item.id.toString() === shoppingListId && item.measure.trimRight() === req.query.measure);

    if (findShopingListIndex === -1) {
        throw new NotFound(`id ${shoppingListId} not found`);
    }
    await user.shopingList.splice(findShopingListIndex, 1);
    const removedShopingList = await User.findOneAndUpdate({ _id: id }, { shopingList: user.shopingList }, { new: true }).select({ shopingList: 1 })
    return res.status(200).json(removedShopingList);
}
module.exports = removeItemFromList;