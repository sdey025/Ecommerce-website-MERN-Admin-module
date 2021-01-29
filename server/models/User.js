const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    location:{
        type:String
    },
    wishlist:[{
        type:String
    }],
    orders:[{
        type:String
    }],
    profilepic:{
        type:String
    },
    coverpic:{
        type:String
    }
})

mongoose.model('User',Userschema)