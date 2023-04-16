const signup = require("./signup");
const signin = require("./signin");
const logout = require("./logout");
const updateById = require("./updateById");
const updateAvatar = require("./updateAvatar");
const refreshTokens = require("./refresh");
const current = require("./current");

module.exports = {
  signup,
  signin,
  logout,
  updateById,
  updateAvatar,
  refreshTokens,
  current,
};
