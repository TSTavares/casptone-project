const Transaction = require('../models/transaction');


const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const getTransactionsByUser = async (req, res) => {
  try {
    const { userName } = req.query;
    const transactions = await Transaction.find({ userName : userName });

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { category, amount, description, userEmail  } = req.body;
    const transaction = new Transaction({ category, amount, description, userEmail });
    await transaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};


const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, description } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { category, amount, description },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction updated successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};


module.exports = {
  getTransaction,
  getTransactionsByUser,
  createTransaction,
  updateTransaction,
  deleteTransaction
};