const express = require("express");
const ctrl = require("../../controllers/recipes");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middleware");
const router = express.Router();

router.get('/category-list', /* authenticate, */ ctrlWrapper(ctrl.getCategoryList));
router.get('/main-page', /* authenticate, */ ctrlWrapper(ctrl.getMainPage));
router.get('/:category', /* authenticate, */ ctrlWrapper(ctrl.getRecipesByCategory));
router.get('/id/:id', /* authenticate, */ ctrlWrapper(ctrl.getRecipeById));
router.get('/', /* authenticate, */ ctrlWrapper(ctrl.getUserRecipe))
router.post('/search', /* authenticate, */ ctrlWrapper(ctrl.searchRecipe))
router.post('/add', authenticate, ctrlWrapper(ctrl.addRecipe))
router.delete('/remove/:id', /* authenticate, */ ctrlWrapper(ctrl.removeRecipe))
module.exports = router;
