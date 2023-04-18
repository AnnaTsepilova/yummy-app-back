const User = require("../../models/user");
const { NotFound } = require("http-errors");
const bcrypt = require("bcryptjs");

const updateById = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name, email, password } = req.body;
    const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.findByIdAndUpdate(
      id,
      { name, email, password: newPassword },
      { new: true }
    );
    if (!result) {
      throw NotFound("User not found");
    }
    const response = {
      id: result._id,
      name: result.name,
      email: result.email,
      shoppingList: result.shoppingList,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
