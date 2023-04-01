const Joi = require('joi');

const recipeSchema = Joi.object({
  title: Joi.string(),
  category: Joi.string(),
  area: Joi.string(),
  instructions: Joi.string(),
  description: Joi.string(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        measure: Joi.string(),
      })
    ),
  thumb: Joi.string(),
});

module.exports = recipeSchema;