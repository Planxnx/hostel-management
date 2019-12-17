const express = require('express');
const router = express.Router();

const hotelRoute = require('./hotel');
const authRoute = require('./auth');

router.use('/hotel', hotelRoute);
router.use('/auth', authRoute);

router.get('/healthcheck', (req, res, next) => {
  res.json({
    status:200,
    message:"ok"
  });
});

module.exports = router;