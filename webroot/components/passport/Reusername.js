import React from 'react';
import { Link } from 'react-router'

const Reusername = React.createClass({

    render(){
        return (
            <div id="reusername">
                <div className="header">
                    <Link to={"/passport/login"} className="cancelLink">{"<"}</Link>
                    找回用户名
                </div>
                <div className="body mb10">
                    <div className="form-self mb15">
                        <div className="no-border-label">
                            <label className="">手机号</label>
                            <input ref="username" className="no-border" />
                        </div>
                        <div className="no-border-label">
                            <label className="">证件号码</label>
                            <input ref="mobile" className="no-border" placeholder="身份证/港澳通行证/台胞证"/>
                        </div>
                    </div>
                </div>
                <div style={{padding:"20px"}}>
                    <p className="mb20">未实名认证的用户请勿输入证件号码</p>
                    <button type="button" className="btn btn-block btn-with-theme">确定</button>
                </div>

            </div>
        )
    }
})

export default Reusername;