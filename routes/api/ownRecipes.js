const express = require("express");
const ctrl = require("../../controllers/ownRecipes");
const { ctrlWrapper } = require("../../helpers");
const { authenticate, validateBody } = require("../../middleware");
const { recipeSchema } = require("../../schemas/recipe");

const router = express.Router();

router.post('/', authenticate, /* validateBody(recipeSchema), */ ctrlWrapper(ctrl.addRecipe));
router.delete('/:id', authenticate, ctrlWrapper(ctrl.ownRecipesRemove));
router.get('/created-by/:userId', authenticate, ctrlWrapper(ctrl.ownRecipesGetById));

module.exports = router;
