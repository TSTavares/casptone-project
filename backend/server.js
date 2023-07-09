//npm init
//npm install express
//npm install dotenv
//npm install nodemon
//npm install mongoose --save
// npm install axios
// npm install cors --save
// add in package.json "scripts": {"start": "nodemon"}
//change "main": "index.js", to "dbConnect.js"

const cors = require('cors')
const express = require("express");
const app = express();
require("dotenv").config();

const dbConnect = require("./dbConnect");

// parse requests of content-type - application/json
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.json({ message: "Welcome to my MongoDB application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

