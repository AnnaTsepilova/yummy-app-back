const Subscriber = require("../../models/subscription");
const { sendEmail } = require("../../helpers");
const mongoose = require("mongoose");
const { EMAIL_FROM, LETTER_IMG, BASE_URL } = process.env;

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).send("Email already subscribed");
    }

    const unsubscribeUrl = `${BASE_URL}/api/subscribe/remove/${email}`;

    const mailOptions = {
      from: EMAIL_FROM,
      to: email,
      subject: "Confirming a subscription to our newsletter",
      html: `
        <div>
          <img src="${LETTER_IMG}" alt="Letter image"> 
          <p>Thank you for subscribing to our newsletter!</p>
          <p>To unsubscribe, follow this link:</p>
          <a href="${unsubscribeUrl}">Unsubscribe</a>
        </div>
      `,
      headers: {
        "Content-Type": "text/html",
      },
    };
    await sendEmail(mailOptions);

    const subscriber = new Subscriber({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
    await subscriber.save();

    res.send("Subscription successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error subscribing");
  }
};

module.exports = subscribe;
