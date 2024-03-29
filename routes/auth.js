const express = require('express');
const router = express.Router();

const userService = require('../database/user/userService')

//สมัครสมาชิก
router.post('/register', (req, res, next) => {
  //validate 
  if (Object.keys(req.body).length === 0) {
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

//เข้าสู่ระบบ
router.post('/login', (req, res, next) => {
  //validate 
  if (Object.keys(req.body).length === 0) {
    res.json({
      status: 400,
      message: "not found data"
    });
    return
  }

  let userPayload = userService.authenticate({
    username: req.body.username,
    password: req.body.password
  })

  if (!userPayload) {
    res.json({
      status: 401,
      message: "wrong username or password"
    });
  } else {
    // แนบ jwt ไปใน resp
    res.json({
      status: 200,
      data: {
        token: userPayload.token,
        username: userPayload.username
      }
    });
  }
});

module.exports = router;