const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const Product = mongoose.model('Product')
const Payment = mongoose.model('Payment')
const stripe = require('stripe')('sk_test_51HPrxMILil9SRE4aryRWo450q7GzE9RoJgeOkQbyB2c2621msZqsNacIXGcEyC1RDQWUB7n2GdC8HuCUSv4pNUOQ00m4tKhMj0')
const uuid = require('uuid').v4
const {JWT_SECRET} = require('../keys')
const passport = require('passport')
const requirelogin = require('../middleware/requirelogin')
/* const { route } = require('./auth') */

router.post('/payment',(req,res) => {
    const totalamount = req.body.cost
    const token = req.body.token
       /*  console.log(req.user.email) */
    stripe.customers.create({
        email: token.email,
        source: token.id
      })
        .then(customer => {
            stripe.charges.create({
                amount: totalamount * 100,
                currency:'inr',
                customer:customer.id,
                receipt_email:token.email
            })
        }).then(result => res.status(200).send(result))
        .catch(error => console.error(error));
})
router.post('/successpay',(req,res) => {
    Product.findByIdAndUpdate(req.body.product_id,{
        $push:{orders:req.body.user_id}
    },{new:true}).exec((err,result) =>{
        if(err){
            res.json(err)
        }
        else{
            User.findByIdAndUpdate(req.body.user_id,{
                $push:{orders:req.body.product_id}
            }).then(data => {
                res.json(data)
            }).catch(error => {
                res.json(error)
            })
        }
    })
})
router.post('/thepayment',(req,res) => {
    const {pid,pname,pcost,pgender,ppic,uname,address,number,date,time,uid} = req.body
    const payment = new Payment({
        pid,
        uname,
        pname,
        pcost,
        pgender,
        address,
        number,
        ppic,
        date,
        time,
        uid
    })
    payment.save().then(result => {
        res.json(result)
    }).catch(error => {
        res.json(error)
    })
})
router.get('/getpayment',(req,res) => {
    Payment.find()
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.json(err)
    })
})
router.get('/getorders',requirelogin,(req,res) => {
    Payment.find({uid:req.user._id})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})
router.get('/orderstatus/:id',(req,res) => {
    Payment.find({_id:req.params.id})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})
router.post('/ship/:id',(req,res) => {
    const {date} = req.body
    Payment.findByIdAndUpdate(req.params.id,{
        $set:{delivered:'shipped',shipping_date:date}
    },{new:true},
    (err,result) => {
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})
router.post('/reach/:id',(req,res) => {
    const {date} = req.body
    Payment.findByIdAndUpdate(req.params.id,{
        $set:{delivered:'reach',reaching_date:date}
    },{new:true},
    (err,result) => {
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})
router.post('/deliver/:id',(req,res) => {
    const {date} = req.body
    Payment.findByIdAndUpdate(req.params.id,{
        $set:{delivered:'deliver',delivery_date:date}
    },{new:true},
    (err,result) => {
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

module.exports = router