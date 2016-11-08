"use strict";
var express = require("express");
var router = express.Router();

var conn = require("../bin/db/DBHelper");

//获取该用户（by id）所有关注的公众号
router.get("/list", (req, res, next) => {
    var id = req.param("id");

    var sql = `select subscriber from users where id=${id}`;

    try{
        conn(sql, rows => {
            var subscris = rows[0].subscriber;
            var sql = `select * from subscriber where id in (${subscris})`;

            conn(sql, rows => {
                res.json({response_data: rows})
            })
        })
    }catch (e){
        res.json({error_code:123, error_msg: "获取公众哈列表报错"})
    }
})

router.get("/info", (req, res, next) => {
    var id = req.param("id");

    var sql = `select * from subscriber where id = ${id}`;

    try{
        conn(sql, rows => {
            res.json({response_data: rows[0]});
        })
    }catch (e){
        res.json({error_code: 123, error_msg: "获取订阅号信息报错"})
    }
})
module.exports = router;