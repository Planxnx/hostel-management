const express = require('express');
const router = express.Router();

const hotelRoute = require('./hotel');

router.use('/hotel', hotelRoute);

router.get('/healthcheck', (req, res, next) => {
  res.json({
    status:200,
    message:"ok"
  });
});

module.exports = router;