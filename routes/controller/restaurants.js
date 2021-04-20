var express = require('express');
// var userService = require('./service/userService');
var router = express.Router();



// 客户用户注册
router.post('/search', function (req, res, next) {
  const searchCondition = req.body;
  console.log(searchCondition)
    res.json({
      state: 1, // 1表示状态成功， 0表示失败
      user: 'dsafdasfda'
    });
  // userService.registUser(userObj, function (err, user, fields) {
  //   res.json({
  //     state: 1, // 1表示状态成功， 0表示失败
  //     user: user
  //   });
  // });
});


module.exports = router;
