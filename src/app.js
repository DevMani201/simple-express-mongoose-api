const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config();
require('./db/conn');
app.use(express.json());

const router = require('../Routers/userRouts');
const PORT = process.env.PORT || 5000;
app.use("/form", router);
app.use(cookieParser());


const User = require('../modals/user');
app.get("/", (req,res) => {
    res.send("<h1>WELCOME TO VITASOFT TECHNOLOGIES PVT LTD</h1>");
})
app.listen(PORT, () => {
    console.log(`run on port no ${PORT}`);
})