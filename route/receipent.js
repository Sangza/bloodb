const auth = require('../middleware/auth');
const {Users } = require('../model/user');
const { Requests } = require('../model/receipent');
const express = require('express');
const router = express.Router();


router.post('/', auth,  async(req,res)=>{
    const user = await Users.findById(req.body.userId);
    if(!user) return res.status(400).send('This action is only carried out by a user');

    let request = new Requests({
        reason:req.body.reason,
        location:req.body.location,
        name:req.body.name,
        urgent:req.body.urgent,
        age:req.body.age,
        bloodType:req.body.bloodType,
        owner:[{
            _id:user._id
        }]
    })

    await request.save();
    res.send(request);
})

router.get('/', auth, async(req,res)=> {
    const requests = await Requests.find();
    res.send(requests);
})


// to get every request sent by a user
router.get('/:id',auth, async(req,res)=>{
    const request = await Requests.find();

    const user = await Users.findById(req.params.id);
    if(!user) return res.status(400).send('User doesn\'t exist');

    for (const requests in request) {
        if (user._id == requests.owner[0]._id) {
            res.send(request);
        }
    }



} )