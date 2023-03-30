const express = require("express");
const ctrl = require("../../controllers/ingredients");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middleware");
const router = express.Router();

router.get("/list", /* authenticate, */ ctrlWrapper(ctrl.getIngredientsList));
router.get("/:ingredientTtl", /* authenticate, */ ctrlWrapper(ctrl.getIngredients));

module.exports = router;
