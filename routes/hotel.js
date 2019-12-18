const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json')
const JWTAuthMiddleware = require('../middleware/jwtAuth')
const hotelService = require('../database/hotel/hotelService')

//ดูรายชื่อโรงแรมทั้งหมด
router.get('/', (req, res, next) => {
    res.json({
      status: 200,
      data: hotelService.getList()
    });
});

//เพิ่มโรงแรม
router.post('/',JWTAuthMiddleware.userAuth, (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.json({
      status: 400,
      message: "not found data"
    });
    return
  }
  
  let tokenArray = req.headers.authorization.split(" ")
  let decoded =jwt.verify(tokenArray[1], config.secret) //ถอดรหัสเพื่อเอา Payload ไปใช้งาน

  let createStatus = hotelService.createHotel(req.body,decoded.username)
  if (createStatus == "success"){
    res.json({
      status: 200,
      message: "success" 
    });
  } else {
    res.json({
      status: 400,
      message: createStatus 
    });
  }
  
});

//ดูข้อมูลโรงแรม จาก id
router.get('/info/:id', (req, res, next) => {
  let hotelInfo = hotelService.getHotel(req.params.id)
  if (hotelInfo){
    res.json({
      status: 200,
      data: hotelInfo
    });
  } else {
    res.json({
      status: 404,
      message: "hotel not found"
    });
  }
  
});

//ดูรายการโรงแรมที่มีห้องว่าง
router.get('/available', (req, res, next) => {
  res.json({
    status: 200,
    data: hotelService.getAvailableHotel()
  });
});

//ดูรายชื่อโรงแรมที่จอง โดยใช้ username ใน Token และมี Middleware คอยเช็ค Token 
router.get('/booking', JWTAuthMiddleware.userAuth, (req, res, next) => {
  //ตัด Bearer ใน Header ออก
  let tokenArray = req.headers.authorization.split(" ")
  let decoded =jwt.verify(tokenArray[1], config.secret) //ถอดรหัสเพื่อเอา Payload ไปใช้งาน
  res.json({
    status: 200,
    data: hotelService.getMyBooking(decoded.username)
  });
});

//จองโรงแรม โดยใช้ username ใน Token และมี Middleware คอยเช็ค Token 
router.post('/booking', JWTAuthMiddleware.userAuth, (req, res, next) => {
  let tokenArray = req.headers.authorization.split(" ")
  let decoded =jwt.verify(tokenArray[1], config.secret)
  let bookingStatus = hotelService.createBooking(decoded.username,req.body.hotelId,req.body.detail)

  if(bookingStatus == "room amount is not enough") {
    res.json({
      status: 400,
      message: bookingStatus
    });
  } else {
    res.json({
      status: 200,
      bookingId: bookingStatus
    });
  }
});

module.exports = router;