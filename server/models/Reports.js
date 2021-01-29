const mongoose = require('mongoose')
const ReportSchema = mongoose.Schema({
    reporter_id:{
        type:String
    },
    reporter_name:{
        type:String
    },
    subject:{
        type:String
    },
    message:{
        type:String
    },
    product_id:{
        type:String
    }
})
mongoose.model('Reports',ReportSchema)