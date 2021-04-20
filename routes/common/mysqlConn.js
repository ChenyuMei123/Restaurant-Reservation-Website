var express = require('express');

var mysql  = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456',
    port: '3306',
    database: 'restaurants',
});
connection.connect();
module.exports = connection;