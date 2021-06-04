const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('connection success');
}).catch((err) => {
    console.log('error' + err);
});