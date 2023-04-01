const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const Subscription = model("subscription", subscriptionSchema);

module.exports = Subscription;
