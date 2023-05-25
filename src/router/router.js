const express = require('express')
const router = express.Router()
const {views,getPopups}=require('../controller/popupController')
const {drivingform,getdrivingschooldata ,dupilicateDrivingSchool ,sortdrivingschool}=require("../controller/drivingschoolController")
const {insuranceForm,getInsurance ,dupilicateInsurance,sortInsurance}=require('../controller/insuranceController')
const {finance,getfinanace , dupilicateFinance , sortFinance}=require('../controller/financeController')
const {Serviceform,getservices, dupilicateService, sortServices}=require("../controller/seviceconroller")
const {onRoadPrice,getOnRoadPrice ,duplicateOnRoadPrice , sortOnRoadPrice}= require("../controller/onRoadPriceController")
//=========================popups==========================================
router.post("/popup",views)
router.get("/getPopups",getPopups)
//=====================drivingschool==================================
router.post("/drvingSchool",drivingform)
router.get("/getdrivingschooldata",getdrivingschooldata)
router.get("/dupilicateDrivingSchool",dupilicateDrivingSchool)
router.get("/sortdrivingschool",sortdrivingschool)

//============================Insurance================================
router.post("/insurance",insuranceForm)
router.get("/getInsurance",getInsurance)
router.get("/dupilicateInsurance",dupilicateInsurance)
router.get("/sortInsurance",sortInsurance)
//======================finance  ========================================
router.post('/finance',finance)
router.get("/getfinanace",getfinanace)
router.get('/dupilicateFinance',dupilicateFinance)
router.get("/sortFinance",sortFinance)
//==========================services=======================================
router.post("/Serviceform",Serviceform)
router.get("/getservices",getservices)
router.get("/dupilicateService" , dupilicateService)
router.get("/sortServices",sortServices)
//==================onRoadPrice==========================================
router.post("/onRoadPrice",onRoadPrice)
router.get("/getOnRoadPrice",getOnRoadPrice)
router.get("/duplicateOnRoadPrice",duplicateOnRoadPrice)
router.get("/sortOnRoadPrice",sortOnRoadPrice)
module.exports = router 
