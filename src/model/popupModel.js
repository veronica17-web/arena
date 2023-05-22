const mongoose = require("mongoose")
const popupSchema = new mongoose.Schema({
    phone:{
    type:String,
    require:true,
    trim:true
},
date:{
    type: String,
},
time :{
    type:String,
},
sno:{
    type:String
},count :{
    type:Number,
    default:0
},
}, { timestamps: true })
module.exports = mongoose.model('popup', popupSchema)