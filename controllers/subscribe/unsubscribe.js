const Subscriber = require("../../models/subscription");
const { BadRequest } = require("http-errors");

const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.params;

    const subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      throw new BadRequest(400, "Subscriber not found");
    }

    await subscriber.deleteOne();

    return res.json({ message: "Unsubscribed successfully" });
  } catch (error) {
    return next(error);
  }
};

module.exports = unsubscribe;
