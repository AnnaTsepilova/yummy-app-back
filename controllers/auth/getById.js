const User = require("../../models/user");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findById(userId);
  if (!result) {
    throw new NotFound("Not found");
  }
  const response = {
    id: result._id,
    name: result.name,
    email: result.email,
    shopingList: result.shopingList,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
  res.json(response);
};

module.exports = getById;
