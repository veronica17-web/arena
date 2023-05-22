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
        enum :["Tour H1","Tour H3","Tour S","Tour v","Tour M"]
    },
    date:{
        type: String,
    },
    time :{
        type:String,
    },
    sno:{
        type:String
    }
}, { timestamps: true })
module.exports = mongoose.model('OnroadPrice', OnroadPriceSchema)