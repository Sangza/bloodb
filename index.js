const config = require('config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./route/auth');
const user = require('./route/user');
const request = require('./route/receipent');
const donor = require('./route/donor');
const criteria = require('./route/criteria');

if(!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwt is not defined");
    process.exit(1);
}


mongoose.connect('mongodb://localhost/blood').then(()=>{
    console.log('Connecting to Mongodb')
    const port = process.env.Port || 3000;
    app.listen(port, () => console.log('Connecting to localhost', port));
     
})

app.use(express.json());
app.use('/api/user',user);
app.use('/api/auth', auth);
app.use('/api/request',request);
app.use('/api/donor',donor);
app.use('/api/criteria',criteria);1

