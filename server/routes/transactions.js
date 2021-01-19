const router = require("express").Router();
const { transactionController } = require("../controllers");

router.get("/", transactionController.fetchTransactions);

router.post("/", transactionController.addTransaction);

router.delete("/:id", transactionController.removeTransaction);

module.exports = router;
