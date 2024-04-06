const express = require('express')
const dotenv = require("dotenv");
const bodyParser = require("body-parser")

const app = express()

dotenv.config();
app.use(bodyParser.json());


module.exports = app;