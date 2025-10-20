const router = require("express").Router();
const contactController = require("../../controllers/admin/contact.controller");

router.get("/list", contactController.list);

router.patch("/change-multi", contactController.changeMultiPatch);

router.delete("/destroy/:id", contactController.destroyDelete);

module.exports = router;
