const express = require("express");
const ctrl = require("../../controllers/favorite");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middleware");
const router = express.Router();

router.post("/:id", authenticate, ctrlWrapper(ctrl.addRecipeFavorite));
router.delete("/:id", authenticate, ctrlWrapper(ctrl.removeRecipeFavorite));
router.get("/", authenticate, ctrlWrapper(ctrl.getListRecipeFavorite));

module.exports = router;
