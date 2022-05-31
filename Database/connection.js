const mongoose = require('mongoose')
const db = mongoose.connection;
const url = process.env.DATABASE;

/// Establishing the connection

const URL = process.env.DATABASE;
console.log(URL);
const dba = mongoose.connection
mongoose.connect(url, { useNewUrlParser: true });

dba.once('open', _ => {
    console.log('Database connected:', URL)
});

dba.on('error', err => {
    console.error('connection error:', err)
});