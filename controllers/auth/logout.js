const User = require("../../models/user");
const { NotFound } = require("http-errors");

const logout = async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { token: "" },
    { new: true }
  );
  if (!updatedUser) {
    throw new NotFound("Not found");
  }
  res.sendStatus(204);
};

module.exports = logout;