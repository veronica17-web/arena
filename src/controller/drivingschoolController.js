const drivingSchoolModel = require("../model/drivingSchoolModel");
const moment = require("moment");
require("moment-timezone");
const {
  isValid,
  isMobileNumber,
  isValidEmail,
  isValidPincode,
  checkPassword,
  checkname,
  checkISBN,
  checkDate,
  isRating,
  isValidBody,
} = require("../validation/validation");

const drivingform = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;
    //         {if (isValidBody(data)) return res.status(400).send({ status: false, message: "Enter the data to submit" });
    //     let{name,email,phone,outlet,date,time,sno}=data
    //     if (!name) return res.status(400).send({ status: false, message: "name is required" });

    //     if (!email) return res.status(400).send({ status: false, message: "email is required" });

    //     if (!phone) return res.status(400).send({ status: false, message: "phone is required" });
    //     if (!isMobileNumber(phone.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Phone number" });
    //     //checking if phone already exist or not
    //     // let duplicatemobile = await drivingSchoolModel.findOne({ mobile: mobile })
    //     // if (duplicatemobile) return res.status(400).send({ status: false, message: "Phone already exist" })

    //     if (!outlet) return res.status(400).send({ status: false, message: "outlet is required" });

    //     let outlets = ["MDS-Kushaiguda","MDS-Nampally","MDS-Malakpet"];
    //         if (!outlets.includes(outlet)) return res.status(400).send({ status: false, msg: `role must be slected among ${outlets}` });
    // }
    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("DD-MM-YYYY");
    let times = moment().format("HH:mm:ss");
    data.date = dates;
    data.time = times;
    // let getdataCount = await drivingSchoolModel.find().count()
    // data.sno = getdataCount + 1
    let saveDate = await drivingSchoolModel.create(data);
    return res.status(201).send({ status: true, data: saveDate });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const getdrivingschooldata = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const filter = req.query;
    const sortOptions = {}; 
 
    if (Object.keys(filter).length === 0) {
      // No query parameters provided, sort by createdAt in descending order
      sortOptions.createdAt = -1;
      const data = await drivingSchoolModel.find({isDeleted:false}).sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      // Sort by the provided filter parameters
      const data = await drivingSchoolModel.find({isDeleted:false}).sort(filter);
      return res.status(200).send({ status: true, data: data });
    }
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
};

module.exports = { drivingform, getdrivingschooldata };
