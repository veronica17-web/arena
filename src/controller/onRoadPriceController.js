const onRoadPriceModel = require('../model/onRoadPriceModel')
const {isValid, isMobileNumber, isValidEmail,isValidPincode,checkPassword,checkname,checkISBN,checkDate,isRating,isValidBody}=require("../validation/validation")
const onRoadPrice = async (req,res)=>{
    try {
        let data = req.body
        let {name,email,phone,outlet,model}=data
        if (!name) return res.status(400).send({ status: false, message: "name is required" });
    
        if (!phone) return res.status(400).send({ status: false, message: "phone is required" });
        if (!isMobileNumber(phone.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Phone number" });
        //checking if phone already exist or not
        // let duplicatemobile = await drivingSchoolModel.findOne({ mobile: mobile })
        // if (duplicatemobile) return res.status(400).send({ status: false, message: "Phone already exist" })
    
        if (!outlet) return res.status(400).send({ status: false, message: "outlet is required" });
    
        let outlets = ["RKS Motor-somajiguda","RKS Motor-malakpet","RKS Motor-secunderabad","RKS Motor-kushaiguda","RKS Motor-kukatpally","RKS Motor-kompally","RKS Motor-shamirpet"]
            if (!outlets.includes(outlet)) return res.status(400).send({ status: false, msg: `role must be slected among ${outlets}` });
     if(model){
        let models=["Tour H1","Tour H3","Tour S","Tour v","Tour M"]
        if (!models.includes(model)) return res.status(400).send({ status: false, msg: `role must be slected among ${models}` });
     }
            var currentdate = new Date();
            var datetime = currentdate.getDay() + "-" + currentdate.getMonth()
                + "-" + currentdate.getFullYear()
            let times = + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            data.date = datetime
            data.time = times
            let getdataCount = await onRoadPriceModel.find().count()
            data.sno = getdataCount + 1
        let saveDate = await onRoadPriceModel.create(data)
        return res.status(201).send({status:true,data:saveDate})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
  
}
const getOnRoadPrice = async (req,res)=>{
    try {
        //let filter = { isDeleted: false }
        let data = await onRoadPriceModel.find()
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.send({ status: false, message: error.message })
    }

}
module.exports = {onRoadPrice,getOnRoadPrice}