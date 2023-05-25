const mongoose = require("mongoose")
const OnroadPriceSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        //unique:true,
        require:true,
        trim:true
    },
    outlet:{
        type:String,
        enum:["RKS Motor-somajiguda","RKS Motor-malakpet","RKS Motor-secunderabad","RKS Motor-kushaiguda","RKS Motor-kukatpally","RKS Motor-kompally","RKS Motor-shamirpet"],
        require:true,
        trim:true
    },
    model:{
        type:String,
        enum :["ALTO","ALTO k10","WAGON R","CELERIO","SWIFT","DZIRE","S-PRESSO","ERITGA","BREZZA","EECO"]
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
module.exports = mongoose.model('OnroadPrice', OnroadPriceSchema)