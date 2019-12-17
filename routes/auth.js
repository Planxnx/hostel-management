const express = require('express');
const router = express.Router();

const userService = require('../database/user/userService')

router.post('/register', (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.json({
      status: 400,
      message: "not found data"
    });
    return
  }
  let createStatus = userService.createUser(req.body)
  if (createStatus == "success") {
    res.json({
      status: 200,
      message: "register success"
    });
  } else {
    res.json({
      status: 401,
      message: createStatus
    });
  }

});

module.exports = router;