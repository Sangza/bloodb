const { required } = require('joi');
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    reason:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    urgent:Boolean,
    age:{
        type:String,
        required:true
    },
    bloodType:{
        type:String,
    },
    owner:[mongoose.Schema.Types.ObjectId]


})

const Requests = mongoose.model('Request',requestSchema);

exports.Requests = Requests;
exports.requestSchema = requestSchema;