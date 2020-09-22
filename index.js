const express = require('express');

const mongoose = require('mongoose');

const url = "mongodb://localhost/emp";

const app = express();

mongoose.connect(url, {useNewUrlParser: true});

const con = mongoose.connection;

con.on('open', ()=>{
    console.log("Connected");
});

app.use(express.json());

const myurl = require('./routes/urls');

app.use('/api', myurl);

app.listen(8000, ()=>{
    console.log('server running at 8000');
});