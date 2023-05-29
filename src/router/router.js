const express = require('express')
const router = express.Router()
const {views,getPopups}=require('../controller/popupController')
const {drivingform,getdrivingschooldata ,dupilicateDrivingSchool ,sortdrivingschool}=require("../controller/drivingschoolController")
const {insuranceForm,getInsurance ,dupilicateInsurance,sortInsurance}=require('../controller/insuranceController')
const {finance,getfinanace , dupilicateFinance , sortFinance}=require('../controller/financeController')
const {Serviceform,getservices, dupilicateService, sortServices}=require("../controller/seviceconroller")
const {onRoadPrice,getOnRoadPrice ,duplicateOnRoadPrice , sortOnRoadPrice}= require("../controller/onRoadPriceController")
const {register , login}=require("../controller/UserController")
const {authentication}=require("../middleware/auth")
//=========================================================================
router.post("/register",register)
router.post("/login",login)
//=========================popups==========================================
router.post("/popup",views)
router.get("/getPopups",getPopups)
//=====================drivingschool==================================
router.post("/drvingSchool",drivingform)
router.get("/getdrivingschooldata",authentication, getdrivingschooldata)
router.get("/dupilicateDrivingSchool",authentication,dupilicateDrivingSchool)
router.get("/sortdrivingschool",authentication,sortdrivingschool)

//============================Insurance================================
router.post("/insurance",insuranceForm)
router.get("/getInsurance",authentication,getInsurance)
router.get("/dupilicateInsurance",authentication,dupilicateInsurance)
router.get("/sortInsurance",authentication,sortInsurance)
//======================finance  ========================================
router.post('/finance',finance)
router.get("/getfinanace",authentication,getfinanace)
router.get('/dupilicateFinance',authentication,dupilicateFinance)
router.get("/sortFinance",authentication,sortFinance)
//==========================services=======================================
router.post("/Serviceform",Serviceform)
router.get("/getservices",authentication,getservices)
router.get("/dupilicateService" ,authentication, dupilicateService)
router.get("/sortServices",authentication,sortServices)
//==================onRoadPrice==========================================
router.post("/onRoadPrice",onRoadPrice)
router.get("/getOnRoadPrice",authentication,getOnRoadPrice)
router.get("/duplicateOnRoadPrice",authentication,duplicateOnRoadPrice)
router.get("/sortOnRoadPrice",authentication,sortOnRoadPrice)
module.exports = router 
