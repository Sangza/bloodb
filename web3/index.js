const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();



mongoose.connect('mongodb://localhost/usdc').then(()=>{
    console.log('connecting to database');
   const port = process.env.Port||3000
    app.listen(port, ()=> console.log('Listening on Port',port))
});

app.set('view engine','pug');
app.set('view','./view');

app.use(express.json());
app.use(express.urlencoded());
