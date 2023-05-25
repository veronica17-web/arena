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
//======================================================================================
const getdrivingschooldata = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const filter = req.query;
    const sortOptions = {};
    let data = [];

    if (Object.keys(filter).length === 0) {
      // No query parameters provided
      sortOptions.createdAt = -1;
      const data = await drivingSchoolModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      const filterDate = filter.date;

      data = await drivingSchoolModel.aggregate([
        { $match: { isDeleted: false, date: filterDate } },
        { $group: { _id: "$phone", doc: { $first: "$$ROOT" } } },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { createdAt: -1 } },
      ]);
    }

    return res.status(200).send({ status: true, data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//=================================================================================

const dupilicateDrivingSchool = async (req, res) => {
  try {
    const repeatedPhoneNumbers = await drivingSchoolModel.aggregate([
      {
        $group: {
          _id: "$phone",
          docs: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
      { $project: { _id: 0, phoneNumber: "$_id", count: 1, docs: 1 } },
    ]);

    return res.status(200).send({ status: true, data: repeatedPhoneNumbers });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//========================================================================================

const sortdrivingschool = async (req, res) => {
  try {
    const filter = req.query;
    const sortOptions = {};

    if (Object.keys(filter).length === 0) {
      // No query parameters provided, sort by createdAt in descending order
      sortOptions.createdAt = -1;
      const data = await drivingSchoolModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      // Sort by the provided filter parameters
      const data = await drivingSchoolModel
        .find({ isDeleted: false })
        .sort(filter);
      return res.status(200).send({ status: true, data: data });
    }
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
};

module.exports = {
  drivingform,
  getdrivingschooldata,
  dupilicateDrivingSchool,
  sortdrivingschool,
};
