const express = require("express");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middleware");
const { signupSchema, signinSchema } = require('../../schemas/user');

const router = express.Router();

router.post("/signup", validateBody(signupSchema), ctrlWrapper(ctrl.signup));

router.post("/signin", validateBody(signinSchema), ctrlWrapper(ctrl.signin));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/:userId", ctrlWrapper(ctrl.getById))

router.put("/:userId", validateBody(signupSchema), ctrlWrapper(ctrl.updateById))

module.exports = router;