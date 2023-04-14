const express = require("express");
const ctrl = require("../../controllers/ownRecipes.js");
const { ctrlWrapper } = require("../../helpers");
const { authenticate, imageUploader } = require("../../middleware");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getRecipes));
router.post("/", authenticate, ctrlWrapper(ctrl.addRecipe));
router.post(
    "/recipeImage",
    authenticate,
    imageUploader.single("image"),
    ctrlWrapper(ctrl.addRecipeImage)
);
router.delete("/:id", authenticate, ctrlWrapper(ctrl.removeRecipe));

module.exports = router;