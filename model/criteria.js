const Joi = require('joi');
const mongoose  = require('mongoose');


const criteriaSchema = new mongoose.Schema({
    name:{
     type: String
    },
    location: {
        type:String
    },
    age:{
        type:String
    },
    weight:{
        type:String
    },
    infection:Boolean,
    fever:Boolean,
    lastDonation:{
        type: Date
    },
    breastFeeding:Boolean,
    hyperTension:Boolean,
    diabeteMellitus:Boolean,
    chronicAnemia:Boolean,
    infectionDermatitis:Boolean,
    anyBleeding:Boolean,
    allergy:Boolean,
    jaundice:Boolean,
    bloodType:{
        type:String,
        required:true
    },
    rhesus:{
      type:String
    },
    viralStatus:[
        {
          hiv:Boolean,
          hepatitis:Boolean
        }
    ],
    owner:[mongoose.Schema.Types.ObjectId]

    
})



const Criterium = mongoose.model('Criteria',criteriaSchema);

function validateCriteria(user){
    const schema = Joi.object({
        bloodType: Joi.string().required()
    })
    return schema.validate(user);
}


exports.Criterium = Criterium;
exports.criteriaSchema = criteriaSchema;
exports.validateCriteria = validateCriteria;