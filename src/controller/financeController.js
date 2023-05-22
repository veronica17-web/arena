const financeModel =require("../model/financeModel")
const {isValid,isValidBody, isMobileNumber, isValidEmail,isValidPincode,checkPassword,checkname,checkISBN,checkDate,isRating,}=require("../validation/validation")

const finance = async(req,res)=>{
    try {
        let data = req.body
        let {name,email,phone,outlet,comments,model,purchaseTime,loanAmount,loanDuration}= data  
        if (isValidBody(data)) return res.status(400).send({ status: false, message: "Enter the data to submit" });
        if (!name) return res.status(400).send({ status: false, message: "name is required" });
        if (!phone) return res.status(400).send({ status: false, message: "name is required" });
        if(outlet){
           let outlets = ["Hyderabad","secunderabad"];
           if (!outlets.includes(outlet)) return res.status(400).send({ status: false, msg: `outlet must be slected among ${outlets}` });
        }
        if(model){
           let models = ["Alto K10","Brezza","Sift","Dzire","Spresso","WagonR","Alto","Ertiga","EECO"];
           if (!models.includes(model)) return res.status(400).send({ status: false, msg: `outlet must be slected among ${models}` });
        }
       
        if(purchaseTime){
           let purchaseTimes = ["Immediate","2Weeks","3weeks","4weeks","4-6weeks","6+weeks"];
           if (!purchaseTimes.includes(purchaseTime)) return res.status(400).send({ status: false, msg: `outlet must be slected among ${purchaseTimes}` });
        }
       if(loanAmount ||loanDuration ){
           if (isValid(loanAmount ||loanDuration)) {
               return res.status(400).send({ status: false, message: "input should me number" })
           };
       }
       var currentdate = new Date();
       var datetime = currentdate.getDay() + "-" + currentdate.getMonth()
           + "-" + currentdate.getFullYear()
       let time = + currentdate.getHours() + ":"
           + currentdate.getMinutes() + ":" + currentdate.getSeconds();
       data.date = datetime
       data.time = time
       let getdataCount = await financeModel.find().count()
       data.sno = getdataCount + 1
        let saveDate = await financeModel.create(data)
        res.status(201).send({status:true,data:saveDate})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
  
}
//=================================================================
const getfinanace = async (req,res)=>{
    try {
        //let filter = { isDeleted: false }
        let data = await financeModel.find()
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.send({ status: false, message: error.message })
    }

}
module.exports ={finance,getfinanace}