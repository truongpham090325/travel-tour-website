const router = require("express").Router();
const accountRotes = require("./account.route");

router.use("/account", accountRotes);

module.exports = router;
