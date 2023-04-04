const express = require("express");
const ctrl = require("../../controllers/popular-recipe");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middleware");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getPopularRecipe));

module.exports = router;
