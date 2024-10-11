const Joi = require('joi');
const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    typeofbloodProduct:{
        type:String
    },
    location:{
        type:String,
    },
    selectauthenticator:{
        type:String
    },
    owner:[mongoose.Schema.Types.ObjectId]

})


const Donates = mongoose.model('Donate',donorSchema);

function validateDonate(donate){
    const schema = Joi.object({
        typeofbloodProduct: Joi.string().required(),
    })
    return schema.validate(donate);
}

exports.Donates = Donates;
exports.donorSchema = donorSchema;
exports.validateDonate = validateDonate;