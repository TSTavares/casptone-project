const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Routes

router.get('/', (req, res) => {
    Controllers.transactionController.getTransaction(req, res)
});

router.get('/transaction-by-user', (req, res) => {
   Controllers.transactionController.getTransactionsByUser(req, res);
 });

//create a transaction information
router.post('/', (req, res) => {
    Controllers.transactionController.createTransaction(req, res)
  });

//update a transaction information
router.put('/:id', (req, res) => {
   Controllers.transactionController.updateTransaction(req, res)
});

//delete a transaction information
router.delete('/:id', (req, res) => {
   Controllers.transactionController.deleteTransaction(req, res)
});

module.exports = router;