const { BadRequest } = require("http-errors");

const validateBody = (schema) => (req, _, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    next(BadRequest(`missing required field — ${error.message}`));
  }
  next();
};

module.exports = validateBody;
