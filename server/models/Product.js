const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const ProductSchema = new mongoose.Schema({
    p_name:{
        type:String
    },
    photo:[{
        type:String
    }],
    desc:{
        type:String
    },
    gender:{
        type:String
    },
    cost:{
        type:String
    },
    wishlist:[{
        type:String
    }],
    orders:[{
        type:String
    }],
    postedby:{
        type:String,
    },
    rating:[{
        type:String,
    }],
    feedback:[{
        type:String
    }],
    feedbackby:[{
        type:String
    }]
})
mongoose.model('Product',ProductSchema)