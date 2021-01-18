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
    Transaction.create({
      text: req.body.text,
      amount: req.body.amount,
    })
      .then((data) => {
        res.status(200).json({ ...data, status: "successfully created" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
