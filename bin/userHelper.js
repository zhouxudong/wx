"use strict";
var conn = require("./db/DBHelper");

var verifCode = function(mobile,code){
    var sql = `select count(id) as num from code where mobile = ${mobile} and code = ${code}`;
    return new Promise((resolve, reject) => {
        conn(sql, rows => {
            if(rows[0].num > 0){
                resolve({key:"code",status:true});
            }else{
                reject({key:"code",status:false});
            }
        })
    })
}
var verifUsrename = function(username){
    var sql = `select count(id) as num from users where username = '${username}'`;
    return new Promise((resolve, reject) => {
        conn(sql, rows => {
            if(rows[0].num == 0){
                resolve({key:"username",status:true});
            }else{
                reject({key:"username",status:false});
            }
        })
    })
}

const userHelper = {
    verifCode: verifCode,
    verifUsrename: verifUsrename
}

module.exports = userHelper;