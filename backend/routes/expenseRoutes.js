const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Routes
router.post('/expenses', expenseController.createExpense);
router.get('/expenses', expenseController.getExpenses);

module.exports = router;