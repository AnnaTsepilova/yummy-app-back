const { NotFound } = require('http-errors');
const User = require("../../models/user");

const removeItemFromList = async (req, res) => {
    const { id } = req.user;
    const { shoppingListId } = req.params;
    const user = await User.findById(id);
    const findShopingListIndex = user.shopingList.filter(item => item.id.toString() === shopingListId.toString()).map(item => item.messure).findIndex(item => item === req.body.messure);
    if (findShopingListIndex === -1) {
        throw new NotFound(`id ${shoppingListId} not found`);
    }
    await user.shopingList.splice(findShopingListIndex, 1);
    await User.findOneAndUpdate({ _id: id }, { shopingList: user.shopingList }, { new: true })
    return res.status(200).json({ message: "success" });
}



module.exports = removeItemFromList;