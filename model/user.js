const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        required: true,
        enum:['donor','recipient']
    },
    bloodType:String
})
userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign(
        {
            _id : this._id,
            role: this.role
        },
        config.get("jwtPrivateKey")
    )
    return token;
}


const Users = mongoose.model('User',userSchema);


function validateUser(user){
const schema = Joi.object({
    username:Joi.string().min(3).max(155).required(),
    email: Joi.string().email({minDomainSegments : 2, tlds:{allow: ['com', 'net']}}).required(),
    password:Joi.string().min(6).required(),
    role:Joi.string().required()
});
    return schema.validate(user);
}


exports.userSchema = userSchema;
exports.Users = Users
exports.validateUser = validateUser;