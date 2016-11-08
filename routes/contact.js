"use strict";
var express = require('express');
var router = express.Router();

var Z_Util = require("../bin/common.js");
var conn = require("../bin/db/DBHelper");

//获取联系人信息
router.get("/list", (req, res, next) => {
    var uid = req.param("uid");
    var sql = `select contacts from users where id = ${uid}`;

    try{
        conn(sql, rows => {
            var contacts = rows[0].contacts;

            var constsSql = `select * from users where id in (${contacts})`;
            conn(constsSql, rows => {
                res.json({response_data: rows});
            })
        })
    }catch (e){
        res.json({error_code:123, error_msg: "获取联系人信息报错"})
    }
})

//获取聊天内容
router.get("/chatcont", (req, res, next) => {
    var uid = req.param("uid");
    var pid = req.param("pid");
    var where = uid < pid ? uid + "_" + pid : pid + "_" + uid;
    var sql = `select m.*,u.portrait,u.name from user_message as m,users as u
                where m.relevance = "${where}" and m.uid = u.id order by m.ctime`;

    try{
        conn(sql, rows => {
            res.json({response_data: rows});
        })
    }catch (e){
        res.json({error_code: 123, error_msg: "获取聊天内容报错"})
    }
})
module.exports = router;