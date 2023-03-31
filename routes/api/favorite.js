const express = require("express");
const ctrl = require("../../controllers/favorite");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middleware");
const router = express.Router();

router.post("/:id", /* authenticate, */ ctrlWrapper(ctrl.addRecipeFavorite));
router.put("/:id", /* authenticate, */ ctrlWrapper(ctrl.removeRecipeFavorite));
router.get("/list", /* authenticate, */ ctrlWrapper(ctrl.getListRecipeFavorite));

module.exports = router;
