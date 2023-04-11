const express = require("express");
const ctrl = require("../../controllers/shopping-list");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middleware");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getShopingList));
router.post("/add", authenticate, ctrlWrapper(ctrl.addInShopingList));
router.delete(
  "/remove/:shoppingListId",
  authenticate,
  ctrlWrapper(ctrl.removeItemFromList)
);

module.exports = router;
