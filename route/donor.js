const auth = require('../middleware/auth');
const { Users } = require('../model/user');
const { Donates, validateDonate } = require('../model/donor');
const express = require('express');
const router = express.Router();


router.post('/', auth,  async(req,res)=>{
const { error } = validateDonate(req.body);
 if(error) return res.status(400).send(error);

    const user = await Users.findById(req.body.userId);
    if(!user) return res.status(400).send('This action is only carried out by a user');

    let donate = new Donates({
        typeofbloodProduct:req.body.typeofbloodProduct,
        location:req.body.location,
        selectauthenticator:req.body.selectauthenticator,
        owner:[{
            _id:user._id
        }]
    })

    await request.save();
    res.send(donate);
})
//those with similar blood group
router.get('/:bloodType',auth,async(req,res)=>{
    const bloodtype = req.params.bloodType;
    const name = await Users.find(bloodtype).toArray();
    res.send(name);
} )

module.exports = router;