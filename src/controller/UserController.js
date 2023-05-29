const userModel = require("../model/userModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require("moment-timezone");

const register = async (req, res) => {
    try {
     
      let data = req.body;
      const {name,email,password, } = data;
      hashedPassword = await bcrypt.hash(password, 10);
      moment.tz.setDefault("Asia/Kolkata");
      let dates = moment().format("DD-MM-YYYY");
      let times = moment().format("HH:mm:ss");
      data.date = dates;
      data.time = times;
      data.password = hashedPassword;
    
      let saveDate = await userModel.create(data);
      res.status(201).send({ status: true, data: saveDate });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  //================================================================
  const login = async (req, res) => {
    try {
        customerData = req.body
        
        const { email, password } = customerData
        //  Email Validation 
     
        const isEmailExists = await userModel.findOne({ email: email })
        if (!isEmailExists) return res.status(401).send({ status: false, message: "Email is Incorrect" })
        //  Password Validation 
     

        const isPasswordMatch = await bcrypt.compare(password,isEmailExists.password)
        if (!isPasswordMatch) return res.status(401).send({ status: false, message: "Password is Incorrect" })

        // > Create Jwt Token 
        const token = jwt.sign(
            { customerID: isEmailExists._id.toString() },
            "verysecret assignment test",
            { expiresIn: '24h' }
        )
        //  Make Respoense
        let result = {
            customerID: isEmailExists._id.toString(),
            token: token,
        }
        res.status(200).send({ status: true, message: "Login Successful", data: result })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { register , login};
