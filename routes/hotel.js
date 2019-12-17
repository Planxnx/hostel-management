const express = require('express');
const router = express.Router();

const hotelService = require('../database/hotel/hotelService')

router.get('/', (req, res, next) => {
    res.json({
      status: 200,
      data: hotelService.getList()
    });
});

router.get('/:id', (req, res, next) => {
  res.json({
    status: 200,
    data: hotelService.getHotel(req.params.id)
  });
});

module.exports = router;