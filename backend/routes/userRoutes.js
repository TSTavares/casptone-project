const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");


// For login page - checks email and password 
router.get('/check-email-and-password', (req, res) => {
    Controllers.userController.checkEmailAndPassword(req, res)
});

router.post('/', (req, res) => {
    Controllers.userController.createUser(req, res)
});

//update a user
router.put('/:id', (req, res) => {
    Controllers.userController.updateUser(req, res)
});

//delete a user
router.delete('/:id', (req, res) => {
    Controllers.userController.deleteUser(req, res)
});



module.exports = router;