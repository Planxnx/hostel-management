const express = require('express');
const router = express.Router();
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

module.exports = router;