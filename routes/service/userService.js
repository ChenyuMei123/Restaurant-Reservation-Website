var mysqlConn = require('../common/mysqlConn');

const mysqlUserService = {

  /**
   * 根据用户名查找
   * @param queryCondition {username: 'jsrenyu'}
   */
  queryByNameOfCustomer: function (userObj, userCallback) {
    mysqlConn.query(
      'select * from customer WHERE name=? and password=?',
      [userObj.name, userObj.password],
      function selectCb(err, results, fields) {
        if (userCallback !== undefined) {
          userCallback(err, results, fields)
        }
        if (err) {
          throw err;
        }

        if (results) {
          for (var i = 0; i < results.length; i++) {
            console.log("%s\t%s", results[i].name, results[i].job);
          }
        }
      }
    );
  },

  /**
   * 根据用户名查找
   * @param queryCondition {username: 'jsrenyu'}
   */
  queryByIdOfCustomer: function (userObj, userCallback) {
    mysqlConn.query(
      'select * from customer WHERE id=? and password=?',
      [userObj.id, userObj.password],
      function selectCb(err, results, fields) {
        if (userCallback !== undefined) {
          userCallback(err, results, fields)
        }
        if (err) {
          throw err;
        }

        if (results) {
          for (var i = 0; i < results.length; i++) {
            console.log("%s\t%s", results[i].name, results[i].job);
          }
        }
      }
    );
  },

  /**
   * 注册用户
   * @param userObj
   * @param userCallback
   */
  registUser: function (userObj, userCallback) {
    var that = this;
    var userAddSql = 'insert into customer (name,gender,email,phone,age,birthday,password,username,admin_status,firstname,lastname) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    var userAddSql_Params = [userObj.name, userObj.gender, userObj.email, userObj.phone, userObj.age, userObj.birthday,
      userObj.password, userObj.username, userObj.admin_status, userObj.firstname, userObj.lastname];
    mysqlConn.query(userAddSql, userAddSql_Params, function (err, result) {
      // 根据name 和 password 去查询，选择最新的一条记录
      that.queryByNameOfCustomer(userObj, function (err, results, fields) {
        var resultsLength = results.length;
        if (resultsLength > 0) {
          userCallback(err, results[resultsLength - 1])
        } else {
          userCallback(err, [])
        }
      });
      if (err) {
        console.log('注册失败：', err.message);
        return;
      }
      console.log('注册用户成功：', result);
    });
  },

  /**
   * 酒店用户注册
   * @param userObj
   * @param userCallback
   */
  registRestaurant: function (userObj, userCallback) {
    var that = this;
    var userAddSql = 'insert into restaurant (name,address,email,phone,closetime,opentime,password,username,admin_status) VALUES (?,?,?,?,?,?,?,?,?)';
    var userAddSql_Params = [userObj.name, userObj.address, userObj.email, userObj.phone, userObj.closetime, userObj.opentime,
      userObj.password, userObj.username, userObj.admin_status];
    mysqlConn.query(userAddSql, userAddSql_Params, function (err, result) {
      // 根据name 和 password 去查询，选择最新的一条记录
      that.queryByNameOfRestaurant(userObj, function (err, results, fields) {
        var resultsLength = results.length;
        if (resultsLength > 0) {
          userCallback(err, results[resultsLength - 1])
        } else {
          userCallback(err, [])
        }
      });
      if (err) {
        console.log('注册失败：', err.message);
        return;
      }
      console.log('注册用户成功：', result);
    });
  },

  /**
   * 根据用户名查找
   * @param queryCondition {username: 'jsrenyu'}
   */
  queryByNameOfRestaurant: function (userObj, userCallback) {
    mysqlConn.query(
      'select * from restaurant WHERE name=? and password=?',
      [userObj.name, userObj.password],
      function selectCb(err, results, fields) {
        if (userCallback !== undefined) {
          userCallback(err, results, fields)
        }
        if (err) {
          throw err;
        }

        if (results) {
          for (var i = 0; i < results.length; i++) {
            console.log("%s\t%s", results[i].name, results[i].job);
          }
        }
      }
    );
  },

  /**
   * 根据用户名查找
   * @param queryCondition {username: 'jsrenyu'}
   */
  queryByIdOfRestaurant: function (userObj, userCallback) {
    mysqlConn.query(
      'select * from restaurant WHERE id=? and password=?',
      [userObj.id, userObj.password],
      function selectCb(err, results, fields) {
        if (userCallback !== undefined) {
          userCallback(err, results, fields)
        }
        if (err) {
          throw err;
        }

        if (results) {
          for (var i = 0; i < results.length; i++) {
            console.log("%s\t%s", results[i].name, results[i].job);
          }
        }
      }
    );
  },

  /**
   * 添加用户
   * @param userObj
   * @param userCallback
   */
  addUser: function (userObj, userCallback) {
    var userAddSql = 'insert into w_user (username,password,role,email,phone,createtime)  VALUES(?,?,?,?,?,?)';
    var userAddSql_Params = [userObj.username, userObj.password, userObj.role, userObj.email, userObj.phone, new Date()];
    mysqlConn.query(userAddSql, userAddSql_Params, function (err, result) {
      if (userCallback !== undefined) {
        userCallback(err, result)
      }
      if (err) {
        console.log('注册失败：', err.message);
        return;
      }
      console.log('注册用户成功：', result);
    });
  },

  /**
   * 用户登录
   * @param userObj
   * @param userCallback
   */
  loginUser: function (userObj, userCallback) {
    mysqlConn.query(
      'select * from w_user u where u.username=? and u.password=?',
      [userObj.username, userObj.password],
      function selectCb(err, results, fields) {
        if (userCallback !== undefined) {
          userCallback(err, results, fields)
        }
        if (err) {
          throw err;
        }
        if (results) {
          for (var i = 0; i < results.length; i++) {
            console.log("%s\t%s", results[i].name, results[i].job);
          }
        }
      }
    );
  },

  // 查询所有用户
  queryUsers: function (pageConfig, userCallback) {
    mysqlConn.query(
      'select * from w_user limit ?,?',
      [parseInt(pageConfig.pageIndex), parseInt(pageConfig.pageSize)],
      function selectCb(err, results, fields) {
        if (userCallback !== undefined) {
          userCallback(err, results, fields)
        }
        if (err) {
          throw err;
        }

        if (results) {
          for (var i = 0; i < results.length; i++) {
            console.log("%s\t%s", results[i].name, results[i].job);
          }
        }
      }
    );
  },

  // 查询所有用户
  getCountOfUsers: function (userCallback) {
    mysqlConn.query(
      'select count(*) as countNum from w_user ',
      [],
      function selectCb(err, results, fields) {
        if (userCallback !== undefined) {
          userCallback(err, results[0].countNum, fields)
        }
        if (err) {
          throw err;
        }

        if (results) {
          for (var i = 0; i < results.length; i++) {
            console.log("%s\t%s", results[i].name, results[i].job);
          }
        }
      }
    );
  },

  // 修改用户by Id
  updateUser: function (userObj, userCallback) {
    var userModSql = 'UPDATE w_user SET username = ?,password = ?,role = ?,email = ?,phone = ?, createtime=? WHERE id = ?';
    var userModSql_Params = [userObj.username, userObj.password, userObj.role, userObj.email, userObj.phone, new Date(), userObj.id];
    //改 up
    mysqlConn.query(userModSql, userModSql_Params, function (err, results) {
      if (userCallback !== undefined) {
        userCallback(err, results)
      }
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      console.log('----------UPDATE-------------');
      console.log('******************************');
    });
  },

  // 删除用户by Id
  delUserById: function (userId, userCallback) {
    var userDelSql = 'DELETE FROM w_user WHERE id = ' + userId;
    //
    mysqlConn.query(userDelSql, function (err, result) {
      if (userCallback !== undefined) {
        userCallback(err, result)
      }
      if (err) {
        console.log('[DELETE ERROR] - ', err.message);
        return;
      }

      console.log('-------------DELETE--------------');
      console.log('DELETE affectedRows', result.affectedRows);
      console.log('&&&&&&&&&&&&&&&&&');
    });
  },
}

module.exports = mysqlUserService;
