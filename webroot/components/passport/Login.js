import React from 'react'
import { render,unmountComponentAtNode } from 'react-dom'
import { Link } from 'react-router'
require("../../statics/less/login.less");
import { Alert } from '../Common';
import Z_API from '../../statics/js/api';
import Z_Util from "../../statics/js/public"

const Login = React.createClass({

    render(){
        return (
            <div id="login">
                <Link to={"/passport/regist"} className="fr">注册新账户</Link>
                <div className="logo"><img src="/statics/images/logo.png"/></div>
                <input defaultValue="" ref="username" className="form-control no_border_input" placeholder="用户名/手机号"/><br/><br/>
                <input defaultValue="" ref="password" className="form-control no_border_input" type="password" placeholder="登录密码"/>
                <button type="button" onClick={this.handleLogin} className="btn btn-with-theme btn-block mt10">登录</button>
                <Link to={"/passport/reusername"} className="fl mt10">找回用户名</Link>
                <Link to={"/passport/repassword"} className="fr mt10">忘记密码</Link>
                <div ref="subpage"></div>
            </div>
        )
    },
    handleLogin(){
        var {username,password} = this.refs;
        var _this = this;
        var { alert } = this;

        if(username.value == ""){
            alert("用户名不能为空");
            return false;
        }else if(password.value == ""){
            alert("密码不能为空");
            return false;
        }


        Z_Util.fetch({
            url: Z_API.login,
            data: {
                username: username.value,
                password: password.value
            },
            success: function(data){
                _this.context.router.push("/appview/home");
            },
            error: function(data){
                alert(json.error_msg);
            }

        })
    },
    alert(msg){
        var { subpage } = this.refs;
        render(<Alert msg={msg} alertClick={this.alertClick} />,subpage);
    },
    alertClick(){
        var { subpage } = this.refs;
        unmountComponentAtNode(subpage);
    },
    contextTypes: {
        router: React.PropTypes.object
    }
})
export default Login;