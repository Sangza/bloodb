const { uuid} = require('uuid');
require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const route = express.Router();
import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";
import { minTokenAbi, rpcEndpoint } from "./constant";
const { ethers }= require('ethers')
const { minTokenAbi,rpcEndpoint } = require('./constant')
 
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
            chain: "goerli",
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
    
   route.get()




  //Using smart contract to pay on eth
  res.post('/usdcAmount',async(req,res)=> {
    const contract =  new ethers.Contract(req.body.tokenAdress,minTokenAbi,req.body.provider)
    const signer =  req.body.provider.getSigner();
   try {
    const demicals = await contract.demicals();
    const balance = await contract.balanceOf(req.body.senderAddress);
    // const balanceValue = ethers.formatUnits(balance, demicals);
    const value = ethers.parseUnits(req.body.userAddress, demicals);
   if (balance >= value)  {
    const transaction =  await contract.connect(signer);
    const tx = transaction.transfer(req.body.receiverAddress,value);
    const receipt = await tx.wait();
    res.send(receipt);
    // tx.on("Transfer",(from,to,amount,event)=> {
    //   res.send(`${ from } sent ${ formatEther(amount) } to ${ to}`)
    // })
   }else{
    res.status(400).send('insufficent balance');
   }
   } catch (error) {
    res.status(400).error(error);
   }
  })
   