const router = require("express").Router();
const profileController = require("../../controllers/admin/profile.controller");
const multer = require("multer");
const cloudinaryHelper = require("../../helpers/clouldinary.helper");
const upload = multer({
  storage: cloudinaryHelper.storage,
});
const profileValidate = require("../../validates/admin/profile.validate");

router.get("/edit", profileController.edit);

router.patch(
  "/edit",
  profileValidate.profileEditPatch,
  upload.single("avatar"),
  profileController.editPatch
);

router.get("/change-password", profileController.changePassword);

router.patch(
  "/change-password",
  profileValidate.profileChangePassword,
  profileController.changePasswordPatch
);

module.exports = router;
