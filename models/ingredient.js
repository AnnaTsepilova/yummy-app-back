const { Schema, model } = require("mongoose");

const ingredientsSchema = new Schema({
  ttl: {
    type: String,
  },
  desc: {
    type: String,
  },
  t: {
    type: String,
  },
  thb: {
    type: String,
  },
});

const Ingredients = model("ingredients", ingredientsSchema);

module.exports = Ingredients;
