const express = require('express')
const router = express.Router()
const {views,getPopups}=require('../controller/popupController')
const {drivingform,getdrivingschooldata}=require("../controller/drivingschoolController")
const {insuranceForm,getInsurance ,dupilicateInsurance,sortInsurance}=require('../controller/insuranceController')
const {finance,getfinanace}=require('../controller/financeController')
const {Serviceform,getservices}=require("../controller/seviceconroller")
const {onRoadPrice,getOnRoadPrice}= require("../controller/onRoadPriceController")
//=========================popups==========================================
router.post("/popup",views)
router.get("/getPopups",getPopups)
//=====================drivingschool==================================
router.post("/drvingSchool",drivingform)
router.get("/getdrivingschooldata",getdrivingschooldata)

//============================Insurance================================
router.post("/insurance",insuranceForm)
router.get("/getInsurance",getInsurance)
router.get("/dupilicateInsurance",dupilicateInsurance)
router.get("/sortInsurance",sortInsurance)
//======================finance  ========================================
router.post('/finance',finance)
router.get("/getfinanace",getfinanace)
//==========================services=======================================
router.post("/Serviceform",Serviceform)
router.get("/getservices",getservices)
//==================onRoadPrice==========================================
router.post("/onRoadPrice",onRoadPrice)
router.get("/getOnRoadPrice",getOnRoadPrice)
module.exports = router 
