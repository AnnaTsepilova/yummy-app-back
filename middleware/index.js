const validateBody = require('./validateBody');
const authenticate = require('./authenticate');
const imageUploader = require('./imageUploader');
const errorHandler = require('./errorHandler');

module.exports = {
  validateBody,
  authenticate,
  imageUploader,
  errorHandler
};