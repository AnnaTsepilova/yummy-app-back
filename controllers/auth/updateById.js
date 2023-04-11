const User = require("../../models/user");
const { NotFound } = require("http-errors");
const bcrypt = require("bcryptjs");

const updateById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.findByIdAndUpdate(
      userId,
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
      shopingList: result.shopingList,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
