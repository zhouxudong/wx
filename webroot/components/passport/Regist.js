import React from 'react'
import { render,unmountComponentAtNode } from 'react-dom'
import { Link } from 'react-router'
import { Alert } from '../Common'
import Z_API from '../../statics/js/api';
import Z_Util from '../../statics/js/public'
require("../../statics/less/login.less");

const Regist = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState(){
        return {
            username: "",
            password: "",
            repassword: "",
            mobile: "",
            code: ""
        }
    },
    handleChangeInput(e){
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name] : value
        })
    },
    render(){
        var {username, password, repassword, mobile, code} = this.state;
        return (
            <div id="regist">
                <div className="header tc">
                    <Link className="cancelLink fl" to={"/passport/login"}>取消</Link>
                    <h3>注册</h3>
                </div>
                <div className="body">
                    <div className="mt10">
                        <input value={username} onChange={this.handleChangeInput} ref="username" name="username" className="form-control" placeholder="用户名"/>
                        <p className="none" data-for="username">4-30位字符，可包含英文字母、数字、-和_。用户名注册后不可更改。</p>
                    </div>
                    <div className="mt10">
                        <input type="password" onChange={this.handleChangeInput} value={password} ref="password" name="password" className="form-control" placeholder="登录密码"/>
                        <p className="none" data-for="password">6-16位字符，可包含数字、字母（区分大小写）、符号中的2种</p>
                    </div>
                    <div className="mt10">
                        <input type="password" value={repassword} onChange={this.handleChangeInput} ref="repassword" name="repassword" className="form-control" placeholder="确认密码"/>
                        <p className="none" data-for="repassword">请再输入一遍登录密码</p>
                    </div>
                    <div className="mt10">
                        <input value={mobile} onChange={this.handleChangeInput} ref="mobile" name="mobile" className="form-control" placeholder="手机号码"/>
                        <p className="none" data-for="mobile">请输入您本人的手机号码，然后点击获取动态码验证您的手机</p>
                    </div>
                    <div className="mt10">
                        <input value={code} onChange={this.handleChangeInput} ref="code" name="code" className="form-control" style={{width:"160px"}} placeholder="动态码"/>
                        <button ref="getCodeBtn" onClick={this.handleGetVcode} type="button" className="btn btn-primary fr">获取动态码</button>
                        <p className="none" data-for="mobile">手机动态码为7位数字</p>
                    </div>
                    <div className="m10">
                        <input ref="agreement" type="checkbox"/> 我已阅读XXX协议
                    </div>
                    <button onClick={this.handleRegister} type="button" className="btn btn-block btn-with-theme">免费注册</button>
                </div>
                <div ref="registSub"></div>
            </div>
        )
    },
    handleRegister(){
        var {username,password,repassword,mobile,vcode} = this.refs;
        var _this = this;
        var { alert } = this;
        var registerData = {};
        var tipInfo = {
            username: '用户名',
            password: '密码',
            repassword: '确认密码',
            mobile: '手机号码',
            code: '动态验证码'
        }
        for(var key in this.refs){

            if(!tipInfo.hasOwnProperty(key)) continue;

            var ele = this.refs[key];
            if(ele.value == ""){
                this.alert(`${tipInfo[key]}不能为空`);
                this.focusEL = ele;
                return false;
            }
            registerData[key] = ele.value;
        }
        if(password.value != repassword.value){
            this.alert("两次密码输入不同");
            this.focusEL = password;
            return false;
        }
        if(!this.refs.agreement.checked){
            this.alert("未同意协议，不能注册");
            this.focusEL = null;
            return false;
        }

        Z_Util.fetch({
            url: Z_API.register,
            data: registerData,
            success: function(data) {
                alert("注册成功",() => {
                    _this.context.router.push("/passport/login")
                })
            },
            error: function(e){}
        })

    },
    handleGetVcode(){
        var Z = Z_Util;
        var { getCodeBtn,mobile,code } = this.refs;
        if(Z.hasClass(getCodeBtn,"disabled")) return false;

        if(!Z.checkMobileFormat(mobile.value)){
            this.alert("请填写正确的手机号码");
            this.focusEL = mobile;
            return false;
        }

        Z.addClass(getCodeBtn,'disabled');
        Z.fetch({
            url: Z_API.getCode,
            data: {
                mobile: mobile.value
            },
            success: function(res){
                code.value = "123456"
            },
            error: function(){}
        })
        var num = 60;
        getCodeBtn.innerText = `${--num}秒后重新获取`;
        var interval = setInterval(function(){
            getCodeBtn.innerText = `${--num}秒后重新获取`;

            if(num <= 0){
                clearInterval(interval);
                $(getCodeBtn).removeClass("disabled");
                getCodeBtn.innerText = "获取动态密码";
            }
        },1000)
    },
    focusEL:null,
    alert(msg,callback){
        var registSub = this.refs.registSub;
        render(<Alert msg={msg} alertClick={ e => {this.alertClick(callback)}}/>,registSub);
    },
    alertClick(callbcak){
        var registSub = this.refs.registSub;
        unmountComponentAtNode(registSub);
        if(this.focusEL) this.focusEL.focus();
        if(callbcak) callbcak();
    }
})
export default Regist;