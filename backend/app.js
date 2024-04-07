const express = require('express')
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const cors = require("cors")



const app = express()
app.use(cors());

dotenv.config();
app.use(bodyParser.json());


module.exports = app;