const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
 
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;