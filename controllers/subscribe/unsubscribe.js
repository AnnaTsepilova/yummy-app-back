const Subscriber = require("../../models/subscription");

const unsubscribe = async (req, res) => {
  try {
    const { email } = req.params;

    const subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      return res.status(400).send("Subscriber not found");
    }

    await subscriber.deleteOne();

    res.send("Unsubscribed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error unsubscribing");
  }
};

module.exports = unsubscribe;
