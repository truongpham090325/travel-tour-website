const router = require("express").Router();
const uploadController = require("../../controllers/admin/upload.controller");
const multer = require("multer");
const cloudinaryHelper = require("../../helpers/clouldinary.helper");
const upload = multer({
  storage: cloudinaryHelper.storage,
});

router.post("/image", upload.single("file"), uploadController.imagePost);

module.exports = router;
