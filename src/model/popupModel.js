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
isDeleted: {
    type: Boolean,
    default: false
},
deletedAt: {
    type: Date
},
}, { timestamps: true })
module.exports = mongoose.model('popup', popupSchema)