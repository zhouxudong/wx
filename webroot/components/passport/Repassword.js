import React from 'react'
import { Link } from 'react-router'
require("../../statics/less/login.less");

const Repassword = React.createClass({
    render(){
        return (
            <div id="repassword">
                <div className="header">
                    <Link to={"/passport/login"} className="cancelLink">{"<"}</Link>
                    重置登录密码
                </div>
                <div className="body mb10">
                    <div className="form-self mb15">
                        <div className="no-border-label">
                            <label className="">用户名</label>
                            <input ref="username" className="no-border" />
                        </div>
                        <div className="no-border-label">
                            <label className="">手机号码</label>
                            <input ref="mobile" className="no-border" placeholder="逍遥玩绑定的11位手机号"/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-block btn-with-theme">下一步</button>
                </div>

            </div>
        )
    }

})
export default Repassword;