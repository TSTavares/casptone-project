const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

//create a user

router.post('/', (req, res) => {
    Controllers.userController.createUser(req, res)
});



module.exports = router;