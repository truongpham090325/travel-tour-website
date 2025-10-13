const multer = require("multer");
const cloudinaryHelper = require("../../helpers/clouldinary.helper");
const upload = multer({ storage: cloudinaryHelper.storage });
const tourValidate = require("../../validates/admin/tour.validate");

const router = require("express").Router();
const tourController = require("../../controllers/admin/tour.controller");
const Tour = require("../../models/tour.model");

router.get("/list", tourController.list);

router.get("/create", tourController.create);

router.post(
  "/create",
  upload.single("avatar"),
  tourValidate.createPost,
  tourController.createPost
);

router.get("/edit/:id", tourController.edit);

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  tourValidate.createPost,
  tourController.editPatch
);

router.get("/trash", tourController.trash);

router.patch("/delete/:id", tourController.deletePatch);

router.patch("/undo/:id", tourController.undoPatch);

router.patch("/change-multi", tourController.changeMultiPatch);

module.exports = router;
