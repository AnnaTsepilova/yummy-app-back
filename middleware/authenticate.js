const User = require("../models/user")
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { Unauthorized } = require('http-errors');
const Session = require("../models/session");

const authenticate = async (req, _, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw Unauthorized("Not authorized")
    }
    const token = authorization.split(' ')[1];
    try {
      const { id, sid } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      const session = await Session.findById(sid)
      if (!user) {
        throw Unauthorized("Not authorized");
      }
      if (!session) {
        throw Unauthorized('Invalid session')
      }
      req.user = user;
      req.session = session;
      next();
    } catch (error) {
      throw Unauthorized("Not authorized");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate; 