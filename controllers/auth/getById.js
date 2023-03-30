const User = require('../../models/user');
const { NotFound } = require('http-errors');

const getById = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findById(userId)
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json(result);
}

module.exports = getById;