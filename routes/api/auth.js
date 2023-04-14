const express = require("express");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const {
    validateBody,
    authenticate,
    imageUploader,
} = require("../../middleware");
const { signupSchema } = require("../../schemas/user");

const router = express.Router();

router.post("/signup", validateBody(signupSchema), ctrlWrapper(ctrl.signup));

router.post("/signin", ctrlWrapper(ctrl.signin));

router.post("/refresh", authenticate, ctrlWrapper(ctrl.refreshTokens));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/", authenticate, ctrlWrapper(ctrl.getById));

router.put(
    "/",
    authenticate,
    validateBody(signupSchema),
    ctrlWrapper(ctrl.updateById)
);

router.post(
    "/avatars",
    authenticate,
    imageUploader.single("image"),
    ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
