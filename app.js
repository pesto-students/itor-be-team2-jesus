const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");


//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//morgan middleware
app.use(morgan("tiny"));









module.exports = app;