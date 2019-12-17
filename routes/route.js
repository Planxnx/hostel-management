const express = require('express');
const router = express.Router();

router.get('/healthcheck', function(req, res, next) {
  res.json({
    status:200,
    message:"available"
  });
});

module.exports = router;