const { Transaction } = require("../models");

module.exports = {
  fetchTransactions(req, res, next) {
    Transaction.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addTransaction(req, res, next) {
    if (req.body.text && req.body.amount) {
      Transaction.create({
        text: req.body.text,
        amount: req.body.amount,
      })
        .then((data) => {
          res.status(200).json({ id: data.id, status: "successfully created" });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.status(500).json({
        success: false,
        error: "one or more fields are empty",
      });
    }
  },
  removeTransaction(req, res, next) {
    Transaction.findByIdAndDelete(req.params.id)
      .then((data) => {
        res.status(200).json({ ...data, status: "successfully deleted" });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          error: err.message,
        });
      });
  },
};
