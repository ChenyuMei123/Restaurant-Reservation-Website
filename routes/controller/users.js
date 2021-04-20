var express = require('express');
var userService = require('../service/userService');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 客户用户注册
router.post('/regist/customer', function (req, res, next) {
  const userObj = req.body;
  userService.registUser(userObj, function (err, user, fields) {
    res.json({
      state: 1, // 1表示状态成功， 0表示失败
      user: user[0]
    });
  });
});

// 客户根据用户名登录
router.post('/login/name', function (req, res, next) {
  const userObj = req.body;
  userService.queryByNameOfCustomer(userObj, function (err, user, fields) {
    res.json({
      state: 1, // 1表示状态成功， 0表示失败
      user: user[0]
    });
  });
});

// 酒店用户注册
router.post('/regist/restaurant', function (req, res, next) {
  const userObj = req.body;
  console.log(userObj);
  userService.registRestaurant(userObj, function (err, user, fields) {
    res.json({
      state: 1, // 1表示状态成功， 0表示失败
      user: user[0]
    });
  });
});

// 用户登录
router.post('/login/cusid',function (req,res,next) {
  const userObj = req.body;
  userService.queryByIdOfCustomer(userObj, function (err, user, fields) {
    res.json({
      state: 1, // 1表示状态成功， 0表示失败
      user: user[0]
    });
  });
});

// 用户登录
router.post('/login/restaurantid',function (req,res,next) {
  const userObj = req.body;
  userService.queryByIdOfRestaurant(userObj, function (err, user, fields) {
    res.json({
      state: 1, // 1表示状态成功， 0表示失败
      user: user
    });
  });
});

// 判断用户是否存在
router.post('/isRepeatByName',function (req,res,next) {
  const userObj = req.body;
  const username = userObj.username; // 用户名

  userService.queryByUsername(username,function(err, result){
    if(result.length > 0) {
      res.json({
        state: 1, // 1表示状态成功， 0表示失败
        message: '用户已经存在',
      });
    }else {
      res.json({
        state: 1, // 1表示状态成功， 0表示失败
        message: '用户不存在',
      });
    }

  });
});


module.exports = router;
