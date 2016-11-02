var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

var Z_Util = require("../bin/common");
var Conf = require("../bin/conf");

/* GET home page. */
router.use(function(req, res, next) {

  var appviewArr = Conf.APPVIEWS;

  if(Z_Util.startsWithArr(req.path,appviewArr)){

    var indexPath = path.join(__dirname,"../webroot/index.html");

    fs.readFile(indexPath,'utf8',(err,data) => {
      res.send(data);
    })

  }else{
    next();
  }
});


module.exports = router;
