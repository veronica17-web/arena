const mongoose = require("mongoose")
const financeSchema = new mongoose.Schema({
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
        enum:["Hyderabad","secunderabad"],
        trim:true
    },
    comments:{
        type:String
    },
    model:{
        type:String,
        enum :["Alto K10","Brezza","Sift","Dzire","Spresso","WagonR","Alto","Ertiga","EECO"],

    },
    purchaseTime:{
        type:String,
        enum:["Immediate","2Weeks","3weeks","4weeks","4-6weeks","6+weeks"],
    },
    loanAmount:{
        type:Number
    },
    loanDuration:{
        type:Number
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
module.exports = mongoose.model('finance', financeSchema)