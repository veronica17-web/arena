const popupModel = require("../model/popupModel");
const moment = require("moment")
require("moment-timezone");
const views = async (req, res) => {
  try {
    let data = req.body;
   
    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("DD-MM-YYYY");
    let times = moment().format("HH:mm:ss");
    data.date = dates;
    data.time = times;
    let saveDate = await popupModel.create(data);
    res.status(201).send({ status: true, data: saveDate });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//=================================================================
const getPopups = async (req, res) => {
    try {
        const filter = req.query;
        const sortOptions = {}; 
        let data = [];
    
        if (Object.keys(filter).length === 0) {
          // No query parameters provided
          sortOptions.createdAt = -1;
          const data = await popupModel.find({isDeleted:false}).sort(sortOptions);
          return res.status(200).send({ status: true, data: data });
        } else {
          const filterDate = filter.date;
          data = await popupModel.aggregate([
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

const sortPopup = async (req, res) => {
  let data = req.query;
  
};
module.exports = { views, getPopups };
