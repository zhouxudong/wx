"use strict";
var express = require("express");
var router = express.Router();

var conn = require("../bin/db/DBHelper");

//获取该用户（by id）所有关注的公众号
router.get("/list", (req, res, next) => {
    var id = req.param("id");

    var sql = `select subscriber from users where id=${id}`;

    conn(sql, rows => {
        var subscris = rows[0].subscriber;
        var sql = `select * from subscriber where id in (${subscris})`;

        conn(sql, rows => {
            res.json({response_data: rows})
        })
    })
})

router.get("/info", (req, res, next) => {
    var id = req.param("id");

    var sql = `select * from subscriber where id = ${id}`;

    conn(sql, rows => {
        res.json({response_data: rows[0]});
    })
})
module.exports = router;