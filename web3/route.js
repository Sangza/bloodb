const { uuid} = require('uuid');
require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const route = express.Router();
import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";
 
const circle = new Circle(
 `${process.env.API_KEY}`,
 CircleEnvironments.sandbox // API base url
);


route.post('/payment',async(req,res)=>{
    const createCryptoPaymentRes = await circle.paymentIntents.createPaymentIntent({
        idempotencyKey: uuid(),
        //  "5c6e9b91-6563-47ec-8c6d-0ce1103c50b3",
        amount: {
          amount: req.body.amount,
          currency: "USD",
        },
        settlementCurrency: "USD",
        paymentMethods: [
          {
            chain: "BASE",
            type: "blockchain",
          },
        ],
      });
      res.send(createCryptoPaymentRes);
})


   route.get('/:id',async(req,res)=>{
    const cryptoPayment = await circle.paymentIntents.getPaymentIntent(req.params.id);
    res.send(cryptoPayment);
   })
    


   