const Expense = require('../models/expense');


const createExpense = async (req, res) => {
  try {
    const { category, amount, description } = req.body;
    const expense = new Expense({ category, amount, description });
    await expense.save();
    res.status(201).json({ message: 'Expense created successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = {
  createExpense,
  getExpenses,
};