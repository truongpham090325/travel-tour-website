const multer = require("multer");
const cloudinaryHelper = require("../../helpers/clouldinary.helper");
const upload = multer({ storage: cloudinaryHelper.storage });
const tourValidate = require("../../validates/admin/tour.validate");

const router = require("express").Router();
const tourController = require("../../controllers/admin/tour.controller");

router.get("/list", tourController.list);

router.get("/create", tourController.create);

router.get("/edit/:id", tourController.edit);

router.post(
  "/create",
  upload.single("avatar"),
  tourValidate.createPost,
  tourController.createPost
);

router.get("/trash", tourController.trash);

module.exports = router;
