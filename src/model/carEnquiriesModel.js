const mongoose = require("mongoose")
const carEnquirySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        // unique:true,
        // require:true,
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
        enum:["RKS Motor-somajiguda","RKS Motor-malakpet","RKS Motor-secunderabad/tadbund","RKS Motor-kushaiguda","RKS Motor-uppal","RKS Motor-kukatpally","RKS Motor-nampally","RKS Motor-shamirpet"],
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
module.exports = mongoose.model('carEnquiry', carEnquirySchema)