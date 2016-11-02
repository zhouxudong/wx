"use strict";
var express = require('express');
var router = express.Router();

var Z_Util = require("../bin/common.js");
var conn = require("../bin/db/DBHelper");

/*get Task list By userID as uid*/
router.get('/:uid',(req,res,next) => {

    console.log(`sessin id is ${req.session.id}`);
    var uid = req.params.uid;

    var now = new Date();

    var dateArr = Z_Util.getCurWeeks(now);
    var mondayDate = dateArr[0].date;
    var sundayDate = dateArr[dateArr.length-1].date;

    var sql = `select * from workinfo where (fordate between '${mondayDate}' and '${sundayDate}') and uid = ${uid}`;

    if(/^\d+$/.test(uid)){
        conn(sql,rows => {
            dateArr.map((dateObj) => {

                for(var row of rows){
                    var dd = new Date(`${row.fordate}`);
                    var dfmt = `${dd.getFullYear()}-${dd.getMonth()+1}-${dd.getDate()}`;
                    if(dfmt == dateObj.date){
                        return Object.assign(dateObj,row);
                    }
                }
                return Object.assign(dateObj,{uid:uid});
            })
            res.json({data:dateArr});
        })
    }else{
        next();
    }
})

router.get("/add",(req,res,next) => {
    var content = req.param("content");
    var uid = req.param("uid");
    var fordate = req.param("fordate");
    var sql = `insert into workinfo (uid,content,fordate) values (${uid},"${content}","${fordate}")`;
    conn(sql,rows => {
        //console.log(rows.insertId);
        res.json({"status":"ok"});
    })
})

router.get("/edit",(req,res,next) => {
    var id = req.param("id");
    var content = req.param("content");
    var sql = `update workinfo set content='${content}' where id=${id}`;
    conn(sql,rows => {
        res.json({"status":"ok"});
    })
})
module.exports = router;