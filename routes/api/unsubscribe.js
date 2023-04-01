const express = require('express');
const ctrl = require("../../controllers/unsubscribe");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/:email", ctrlWrapper(ctrl.unsubscribe));


module.exports = router;

