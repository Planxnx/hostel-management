const express = require('express');
const router = express.Router();

const hotelRoute = require('./hotel');

router.use('/hotel', hotelRoute);

router.get('/healthcheck', function(req, res, next) {
  res.json({
    status:200,
    message:"available"
  });
});

module.exports = router;