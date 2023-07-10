const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Routes

router.get('/', (req, res) => {
    Controllers.expenseController.getExpenses(res)
});

router.post('/', (req, res) => {
    Controllers.expenseController.createExpense(req, res)
  });

module.exports = router;