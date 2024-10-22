const _ = require('lodash');
require('dotenv').config();
const bcrypt =  require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const route = express.Router();
const {Users,validateUser} = require('../model/user.js')



route.post('/', async(req,res)=>{
  const {error} = validateUser(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({email:req.body.email});
  if(user) return res.status(400).send('This user already exist');
 
   user = new Users({
    username:req.body.username,
    email:req.body.email,
    role:req.body.role,
    password:req.body.password,
    bloodType:req.body.bloodType
  })

const saltround = parseInt(process.env.SALT_ROUNDS,10) || 10;

const salt = await bcrypt.genSalt(saltround);
console.log(user.password);
user.password = await bcrypt.hash(user.password,salt);

await user.save();

const token = user.generateAuthToken();
res.header('x-auth-token',token).send(_.pick(user,['username','email','role']))

})


route.get('/:bloodType', auth, async(req,res)=>{
  const users = await Users.find(req.params.bloodType);
  res.send(users);
})

module.exports = route;