const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Routes

router.get('/', (req, res) => {
    Controllers.expenseController.getExpense(req, res)
});

//create a expense information
router.post('/', (req, res) => {
    Controllers.expenseController.createExpense(req, res)
  });

//update a expense information
router.put('/:id', (req, res) => {
   Controllers.expenseController.updateExpense(req, res)
});

//delete a expense information
router.delete('/:id', (req, res) => {
   Controllers.expenseController.deleteExpense(req, res)
});

module.exports = router;