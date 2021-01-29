const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Product = mongoose.model('Product')
const requirelogin = require('../middleware/requirelogin')

router.post('/sell',(req,res) => {
    const {p_name,cost,desc,photo,gender,postedby} = req.body
    const product = new Product({
        p_name,
        cost,
        desc,
        photo,
        gender,
        postedby
    })
    product.save().then(res => {
        res.json({res: "Product Added !!!"})
        console.log(res)
    }).catch(err => {
        res.json({err: "An Error Occured !!!"})
        console.log(err)
    })
})
router.get('/myproducts',requirelogin,(req,res) => {
    Product.find({postedby:req.user._id})
    .then(products => {
        res.json({products})
        console.log(products)
    })
    .catch(error => {
        res.json(422).json({error})
        console.log(error)
    })
})
router.get('/myproductdetails/:id',requirelogin,(req,res) => {
    Product.find({_id:req.params.id})
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})
router.delete('/deleteproduct/:id',requirelogin,(req,res) => {
    Product.findByIdAndRemove(req.params.id,(err,data) => {
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
})
router.get('/allproducts',(req,res) => {
    Product.find()
    .then(result => {   
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})
router.get('/prodetails/:id',(req,res) => {
    Product.find({_id:req.params.id})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})
router.put('/wishlist',requirelogin,(req, res) => {
    Product.findByIdAndUpdate(req.body.proid,{
        $push:{wishlist:req.user._id}
    },{
        new:true
    }).exec((err,result) => {
        if(err){
            return res.send(err)
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{wishlist:req.body.proid}
        }).then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
        
    })
})
router.put('/nowishlist',requirelogin,(req,res) => {
    Product.findByIdAndUpdate(req.body.proid,{
        $pull:{wishlist:req.user._id}
    },{new:true}).exec((err,result) => {
        if(err){
            return res.send(err)
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{wishlist:req.body.proid}
        }).then(data => {
            res.json(data)
        }).catch(error => {
            res.json(error)
        })
        
    })
})
router.put('/feed',(req,res) => {
    const {rating,feedback,pid,myid} = req.body
    Product.findByIdAndUpdate(pid, {
        $push:{rating:rating, feedback:feedback, feedbackby:myid}
    },{new:true},(err,result) => {
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
})

module.exports = router