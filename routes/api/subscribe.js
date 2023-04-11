const express = require("express");
const ctrl = require("../../controllers/subscribe");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middleware");
const emailSchema = require("../../schemas/subscribe");

const router = express.Router();

router.post("/", validateBody(emailSchema), ctrlWrapper(ctrl.subscribe));
router.get("/remove/:email", ctrlWrapper(ctrl.unsubscribe));

module.exports = router;
