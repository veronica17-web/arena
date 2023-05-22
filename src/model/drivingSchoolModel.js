const mongoose = require("mongoose")
const drivingSchoolSchema = new mongoose.Schema({
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
        enum:["MDS-Kushaiguda","MDS-Nampally","MDS-Malakpet"],
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
module.exports = mongoose.model('drivingSchools', drivingSchoolSchema)