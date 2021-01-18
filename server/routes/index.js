const router = require("express").Router();
const transactions = require("./transactions.js");

router.use("/transactions", transactions);

module.exports = router;
