const mongoose = require('mongoose');


const web3Scheme = new mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String
    },
    amount:String,
 
})