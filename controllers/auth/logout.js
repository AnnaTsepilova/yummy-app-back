const User = require("../../models/user");
const { NotFound } = require("http-errors");
const Session = require("../../models/session");

const logout = async (req, res) => {
  const currentSession = req.session;
  await Session.deleteOne({ _id: currentSession._id });
  res.sendStatus(204);
};

module.exports = logout;