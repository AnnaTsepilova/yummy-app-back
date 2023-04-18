const User = require("../../models/user");

const getShopingList = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  return res.status(200).json(user.shoppingList);
};

module.exports = getShopingList;
