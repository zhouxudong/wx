var express = require("express");
var router = express.Router();
var user = require("./user");               //用户
var task = require("./task");               //任务
var message = require("./message");         //消息
var contact = require("./contact");         //联系人
var subscriber = require("./subscriber"); //公众号、订阅号

router.use("/user", user);
router.use("/task", task);
router.use("/message", message);
router.use("/contact", contact);
router.use("/subscriber", subscriber);

module.exports = router;