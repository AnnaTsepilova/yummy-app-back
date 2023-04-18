const { NotFound } = require("http-errors");
const User = require("../../models/user");

const removeItemFromList = async (req, res) => {
  const { id } = req.user;
  const { shoppingListId } = req.params;
  const { recipeId } = req.query;
  const user = await User.findById(id);
  if (recipeId) {
    const shopingListIndex = await user.shoppingList.findIndex(
      (item) =>
        item.recipesId.includes(recipeId) &&
        item.id.toString() === shoppingListId &&
        item.measure === req.query.measure
    );
    await user.shoppingList.splice(shopingListIndex, 1);
    const removedShopingList = await User.findOneAndUpdate(
      { _id: id },
      { shoppingList: user.shoppingList },
      { new: true }
    ).select({ shoppingList: 1 });
    return res.status(200).json(removedShopingList);
  }
  const findShopingListIndex = await user.shoppingList.findIndex(
    (item) =>
      item.id.toString() === shoppingListId &&
      item.measure.trimRight() === req.query.measure
  );

  if (findShopingListIndex === -1) {
    throw new NotFound(`id ${shoppingListId} not found`);
  }
  await user.shoppingList.splice(findShopingListIndex, 1);
  const removedShopingList = await User.findOneAndUpdate(
    { _id: id },
    { shoppingList: user.shoppingList },
    { new: true }
  ).select({ shoppingList: 1 });
  return res.status(200).json(removedShopingList);
};

module.exports = removeItemFromList;
