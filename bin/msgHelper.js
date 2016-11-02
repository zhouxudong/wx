"use strict";
var express = require("express");
var conn = require("./db/DBHelper");

//获取用户根联系人的聊天记录
var getUser_chat_msgs = function(uid) {
    /**
    *获取user_message表中 (uid || contact_id) = login_id  的所有记录
    *然后 只获取跟同一人多次聊天记录的最后一次记录 =>  group by relevance
    *最后 合并聊天对象的用户信息 一起返回
    */
    var sql = `
        select b.*, users.name,users.portrait
        from (select * from
                (select * from user_message where uid = ${uid} or contact_id = ${uid} order by ctime DESC) as a group by relevance
        ) as b , users where if((b.uid - ${uid}),b.uid,b.contact_id) = users.id
    `;
    return new Promise((resolve, reject) => {
        conn(sql, rows => {
            resolve({key:"user_msg",data:rows});
        })
    })
}

//获取用户跟公众号的聊天记录
var getOficial_caht_msgs = function(uid) {
    var sql = `
        select b.*, subscriber.name,subscriber.logo
        from (select * from
                (select * from subscriber_message where uid = ${uid} or oid = ${uid} order by ctime DESC) as a group by relevance
        ) as b , subscriber where if((b.uid - ${uid}),b.uid,b.oid) = subscriber.id
    `;
    return new Promise((resolve, reject) => {
        conn(sql, rows => {
            resolve({key:"oficial_msg",data:rows});
        })
    })
}

module.exports = {
    getUsermsg: getUser_chat_msgs,
    getOficialmsg: getOficial_caht_msgs
}