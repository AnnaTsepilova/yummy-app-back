const express = require("express");
const ctrl = require("../../controllers/recipes");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middleware");
const router = express.Router();

router.get("/category-list", authenticate, ctrlWrapper(ctrl.getCategoryList));
router.get("/main-page", authenticate, ctrlWrapper(ctrl.getMainPage));
router.get("/popular", authenticate, ctrlWrapper(ctrl.getPopularRecipes));
router.get("/search", authenticate, ctrlWrapper(ctrl.searchRecipe));
router.get("/:category", authenticate, ctrlWrapper(ctrl.getRecipesByCategory));
router.get("/id/:id", authenticate, ctrlWrapper(ctrl.getRecipeById));
module.exports = router;
