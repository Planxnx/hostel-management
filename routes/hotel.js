const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json')
const JWTAuthMiddleware = require('../middleware/jwtAuth')
const hotelService = require('../database/hotel/hotelService')

router.get('/', (req, res, next) => {
    res.json({
      status: 200,
      data: hotelService.getList()
    });
});

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

router.get('/available', (req, res, next) => {
  res.json({
    status: 200,
    data: hotelService.getAvailableHotel()
  });
});

router.get('/booking', JWTAuthMiddleware.userAuth, (req, res, next) => {
  let tokenArray = req.headers.authorization.split(" ")
  let decoded =jwt.verify(tokenArray[1], config.secret)
  res.json({
    status: 200,
    data: hotelService.getMyBooking(decoded.username)
  });
});

module.exports = router;