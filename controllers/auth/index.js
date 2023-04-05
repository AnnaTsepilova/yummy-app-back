const signup = require('./signup');
const signin = require('./signin');
const logout = require('./logout');
const getById = require('./getById');
const updateById = require('./updateById');
const updateAvatar = require('./updateAvatar');
const refreshTokens = require('./refresh')
module.exports = {
  signup,
  signin,
  logout,
  getById,
  updateById,
  updateAvatar,
  refreshTokens
}