const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {JWT_SECRET} = require('../keys')
const passport = require('passport')
const requirelogin = require('../middleware/requirelogin')


router.post('/signup',(req, res) => {
    const{name,email,password,dob,username} = req.body
    if(!email || !name || !password || !dob){
        return res.status(422).json({error:"Please fill each fields !!!"})
    }
    User.findOne({email : email})
        .then((SavedUser) => {
            if(SavedUser){
                return res.status(422).json({error: "Email already exist !!!"})
            }
            else{
                bcrypt.hash(password, 12).then(hashedpass => {
                    const user = new User({
                        name,
                        password:hashedpass,
                        email,
                        dob,
                        username,
                    })
                    user.save()
                    .then(user => {
                        res.json({user:"User saved successfully !!!"})
                    })
                    .catch(err => {
                        res.status(422).json({error:"An error occured !!!"})
                    })
                })
            }
        }).catch(err =>{
            res.status(422).json({error:"An error occured !!!"})
        })
})
router.post('/signin',(req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(422).json({error: "All Fields are mandatory"})
    }
    User.findOne({email : email})
    .then(SavedUser => {
        if(!SavedUser){
            res.status(422).json({error : "Invalid Email or Password"})
        }
        else{
            bcrypt.compare(password, SavedUser.password)
            .then(doMatch => {
                if(doMatch){
                    const token = jwt.sign({_id : SavedUser._id}, JWT_SECRET)
                    const {_id,name,email,dob,username,wishlist,bio,location,profilepic,coverpic} = SavedUser
                    res.json({token, user : {_id,name,email,dob,username,wishlist,bio,location,profilepic,coverpic} })
                }else{
                    res.status(422).json({error : "invalid Email or password"})
                }
            }).catch(err => {
                res.json(err)
            })
        }
    }).catch(err => {
        res.json(err)
    })
})
router.put('/addetails',requirelogin,(req,res) => {
    User.findByIdAndUpdate(req.user._id,{
        $set:{bio:req.body.bio, location:req.body.location}
    },{new:true},(err,result) => {
        if(err){
            /* return res.status(422).json({error:"pic cannot post"}) */
            console.log(err)
        }
        console.log(result)
        res.json(result)
    })
})
router.get('/users',(req,res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.json(err)
    })
})

module.exports = router