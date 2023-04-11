const Session = require("../../models/session");
const { BadRequest } = require("http-errors");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const refreshTokens = async (req, res) => {
  const authorizationHeader = req.get("Authorization");
  if (authorizationHeader) {
    const activeSession = await Session.findById(req.body.sid);
    if (!activeSession) {
      throw BadRequest("Invalid session");
    }
    const reqRefreshToken = authorizationHeader.replace("Bearer ", "");
    const token = jwt.verify(reqRefreshToken, SECRET_KEY);
    const user = await User.findById(token.id);
    const session = await Session.findById(token.sid);
    if (!user) {
      throw BadRequest("Invalid User");
    }
    if (!session) {
      throw BadRequest("Invalid Session");
    }
    await Session.findByIdAndDelete(token.sid);
    const newSession = await Session.create({
      uid: user._id,
    });
    const newAccessToken = jwt.sign(
      { id: user._id, sid: newSession._id },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const newRefreshToken = jwt.sign(
      { id: user._id, sid: newSession._id },
      SECRET_KEY,
      { expiresIn: "30d" }
    );
    return res
      .status(200)
      .json({ newAccessToken, newRefreshToken, newSid: newSession._id });
  }
};

module.exports = refreshTokens;
