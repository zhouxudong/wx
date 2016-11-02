"use strict";
var express = require('express');
var router = express.Router();

var Z_Util = require("../bin/common.js");
var conn = require("../bin/db/DBHelper");
var msgHelper = require("../bin/msgHelper");
var getUsermsg = msgHelper.getUsermsg;
var getOficialmsg = msgHelper.getOficialmsg;

router.get("/list", (req,res,next) => {
    var uid = 1;

    Promise.all([
        getUsermsg(uid),
        getOficialmsg(uid)
    ]).then(function(){
        var resArr = [];
        //console.log(arguments.length)
        for(var obj of arguments[0]){
            resArr = resArr.concat(obj.data);
        }
        res.json({response_data:resArr})
    }).catch(function(){
        res.json({error_code: 123})
    })

})


module.exports = router;