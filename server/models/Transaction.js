const mongoose = require("mongoose");
const { Schema } = mongoose;

const Transaction = mongoose.model(
  "Transaction",
  new Schema({
    text: String,
    amount: Number,
  })
);

module.exports = Transaction;
