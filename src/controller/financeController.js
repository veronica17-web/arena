const financeModel = require("../model/financeModel");
const moment = require("moment");
require("moment-timezone");
const {
  isValid,
  isValidBody,
  isMobileNumber,
  isValidEmail,
  isValidPincode,
  checkPassword,
  checkname,
  checkISBN,
  checkDate,
  isRating,
} = require("../validation/validation");

const finance = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;

    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("DD-MM-YYYY");
    let times = moment().format("HH:mm:ss");
    data.date = dates;
    data.time = times;
    let saveDate = await financeModel.create(data);
    res.status(201).send({ status: true, data: saveDate });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//=================================================================
const getfinanace = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  try {
   
    const filter = req.query;
    const sortOptions = {}; 
 
    if (Object.keys(filter).length === 0) {
      // No query parameters provided, sort by createdAt in descending order
      sortOptions.createdAt = -1;
      const data = await financeModel.find({isDeleted:false}).sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      // Sort by the provided filter parameters
      const data = await financeModel.find({isDeleted:false}).distinct("phone");;
      return res.status(200).send({ status: true, data: data });
    }
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
};
module.exports = { finance, getfinanace };
