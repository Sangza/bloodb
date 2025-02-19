const { Criterium,validateCriteria } = require('../model/criteria');
const {Users} = require('../model/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req,res)=> {
    const { error } = validateCriteria(req.body);
    if (error) return res.status(400).send('Please your bloodType is necessary');
    
     const users = await Users.findById(req.body.userId);
     if(!users)return res.status(400).send('Does not exist');


    let user = new Criterium({
        name:req.body.name,
        location:req.body.location,
        age:req.body.age,
        weight:req.body.weight,
        infection:req.body.infection,
        fever:req.body.fever,
        lastDonation:req.body.lastDonation,
        breastFeeding:req.body.breastFeeding,
        hyperTension:req.body.hyperTension,
        diabeteMellitus:req.body.diabeteMellitus,
        chronicAnemia:req.body.chronicAnemia,
        infectionDermatitis:req.body.infectionDermatitis,
        anyBleeding:req.body.anyBleeding,
        allergy:req.body.allergy,
        jaundice:req.body.jaundice,
        bloodType:req.body.bloodType,
        owner:[{
            _id:users._id
        }]
    })

    await user.save();
    res.send(user);
});

router.get('/:id',async(req,res)=>{
    const criteria = await Criterium.findById(req.params.id);
    if(!criteria) return res.status(400).send('User doesn\'t exist');
    res.send(criteria);
})

module.exports = router;