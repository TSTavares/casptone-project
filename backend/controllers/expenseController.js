const Expense = require('../models/expense');


const createExpense = async (req, res) => {
  try {
    const { category, amount, description, userEmail } = req.body;
    const expense = new Expense({ category, amount, description, userEmail });
    await expense.save();
    res.status(201).json({ message: 'Expense created successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.find();
    res.json({ expense });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, description } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      id,
      { category, amount, description },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};


module.exports = {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense
};