const carEnquiryModel =require("../model/carEnquiriesModel")
const moment = require("moment");
require("moment-timezone");
//========================= 
const createCarEnquires = async (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;

    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("DD-MM-YYYY");
    let times = moment().format("HH:mm:ss");
    data.date = dates;
    data.time = times;
    // let getdataCount = await drivingSchoolModel.find().count()
    // data.sno = getdataCount + 1
    let saveDate = await carEnquiryModel.create(data);
    return res.status(201).send({ status: true, data: saveDate });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}
//==============================================
const duplicateCarEnquiry = async (req,res)=>{
  try {
    const repeatedPhoneNumbers = await carEnquiryModel.aggregate([
      { $group: { _id: "$phone",  docs: { $push: "$$ROOT" } ,count: { $sum: 1 },} },
      { $match: { count: { $gt: 1 } } },
      { $project: { count: 1, docs: 1 , _id: 0, phoneNumber: "$_id", } }
    ]);

    return res.status(200).send({ status: true, data: repeatedPhoneNumbers });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
} 
//=============================================================
const sortcarEnquiry = async (req, res) => {
  try {
    const filter = req.query;
    const sortOptions = {}; 
 
    if (Object.keys(filter).length === 0) {
      // No query parameters provided, sort by createdAt in descending order
      sortOptions.createdAt = -1;
      const data = await carEnquiryModel.find({isDeleted:false}).sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      // Sort by the provided filter parameters
      const data = await carEnquiryModel.find({isDeleted:false}).sort(filter);
      return res.status(200).send({ status: true, data: data });
    }
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
  
}
module.exports = {createCarEnquires , duplicateCarEnquiry , sortcarEnquiry}