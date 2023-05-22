const popupModel = require("../model/popupModel")

const {isValid, isMobileNumber, isValidEmail,isValidPincode,checkPassword,checkname,checkISBN,checkDate,isRating,isValidBody}=require("../validation/validation")
const views = async (req, res) => {
    try {
        let data = req.body
        let {phone} = data
        if (isValidBody(data)) return res.status(400).send({ status: false, message: "Enter the data to submit" });
        //validating user phone
        if (!phone) return res.status(400).send({ status: false, message: "User Phone number is required" });
        if (!isMobileNumber(phone.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Phone number" });

        var currentdate = new Date();
        var datetime = currentdate.getDay() + "-" + currentdate.getMonth()
            + "-" + currentdate.getFullYear()
        let time = + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        data.date = datetime
        data.time = time
        let getdataCount = await PopupModel.find().count()
        data.sno = getdataCount + 1
        let saveDate = await PopupModel.create(data)
        res.status(201).send({ status: true, data: saveDate })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}
const getPopups = async (req,res)=>{
    try {
        //let filter = { isDeleted: false }
        let data = await popupModel.find({
            $expr: {
                $eq: [
                    { $dateToString: { format: '%d-%m-%Y', date: '$$NOW' } },
                    { $dateToString: { format: '%d-%m-%Y', date: '$created_on' } },
                ],
            },
        })
        
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.send({ status: false, message: error.message })
    }

}

const sorting =  async (req,res)=>{
let data = req.query

}
module.exports = { views,getPopups }
