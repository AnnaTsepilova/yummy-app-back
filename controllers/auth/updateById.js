const User = require('../../models/user');
const { NotFound } = require('http-errors');

const updateById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    const result = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
    if (!result) {
      throw NotFound("User not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;