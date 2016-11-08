"use strict";
var express = require('express');
var router = express.Router();

var Z_Util = require("../bin/common.js");
var conn = require("../bin/db/DBHelper");
var userHelper = require("../bin/userHelper");

var verifCode = userHelper.verifCode;
var verifUsrename = userHelper.verifUsrename;

//登录
router.get("/login", (req,res,next) => {

    var username = req.param("username");
    var password = req.param("password");
    var sql = `select count(id) as count from users where username = '${username}' and password= '${password}'`;
    console.log(sql);
    conn(sql, rows => {
        console.log(rows[0].count);
        if(rows[0].count > 0){
            req.session.login = 1;
            res.cookie('ZUCSS', 'on', {domain: ".zhouxd.com", expires: new Date(Date.now() + 2592000000)});
            res.json({"status":"ok"});
        }else{
            res.json({"error_code":"123456",error_msg: "用户名跟密码不匹配"});
        }

    })
})

//注册
router.get("/register", (req,res,next) => {

    var resObj = {},
        username = req.param("username"),
        password = req.param("password"),
        mobile = req.param("mobile"),
        code = req.param("code"),
        sql = `insert into users (username,password,mobile) values ("${username}","${password}","${mobile}")`;

    console.log("register sql: " +  sql);
    var regist = Promise.all([
        verifCode(mobile,code),
        verifUsrename(username)
    ]).then((status1,status2) => {
        resObj = {response_data:{status:"ok"}}

        conn(sql, rows => {
            res.json(resObj);
        })

    }).catch(function(){
        for(var err of arguments){
            console.log(err);
            if(err.key == "code"){
                resObj = {error_code:123,msg:"验证码不正确"}
            }else if(err.key == "username"){
                resObj = {error_code:123,msg:"用户名已被注册"}
            }
        }
        res.json(resObj);

    })

})
router.get("/info", (req, res, next) => {
    var id = req.param("id");
    var sql = `select * from users where id = ${id}`;

    conn(sql, rows => {
        res.json({response_data: rows[0]});
    })
})

//验证码
router.get("/code", (req,res,next) => {


    var mobile = req.param("mobile"),
        code = 123456,
        message = `来自自来水厂的消息：短信验证码为 ${code} ，10分钟有效，别告诉别人`,
        sql = `insert into code (mobile,code,message) values ("${mobile}","${code}","${message}")`;
    console.log(sql);
    conn(sql, rows => {
        res.json({response_data:true});
    })
})

module.exports = router;