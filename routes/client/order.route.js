const router = require("express").Router();
const orderController = require("../../controllers/client/order.controller");
const orderValidate = require("../../validates/client/order.validate");

router.post(
  "/create",
  orderValidate.orderCreatePost,
  orderController.createPost
);

module.exports = router;
