// Main Express Code 

const express = require("express");
const dotnev = require('dotenv');
dotnev.config({path:'./config.env'});
const router = require("./Routes/auth");
const app = express();
app.use(express.json())

require("./Database/connection")
app.use(router);
module.exports = app;


