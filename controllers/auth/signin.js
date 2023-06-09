const User = require("../../models/user");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Session = require("../../models/session");
const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const newSession = await Session.create({ uid: user._id });

    const accessToken = jwt.sign(
      { id: user._id, sid: newSession._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, sid: newSession._id },
      SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({
      accessToken,
      refreshToken,
      sid: newSession._id,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatarURL: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = signin;
