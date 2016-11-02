import React from 'react';
import Z_Util from '../../statics/js/public'

const ChatSet = React.createClass({
    render(){
        return (
            <div className="chatSet viewItem" ref="chatSet">
                <div className="header">
                    <i onClick={this.handleReturn} className="icon-angle-left"></i> 聊天信息
                </div>
                <div className="chatpanel content">
                    <div className="chset_group">
                        <div className="portrait">
                            <img src="/statics/images/portrait.png" /><br/>
                            皮肤狗
                        </div>
                        <div className="portrait">
                            <img src="/statics/images/portrait.png" /><br/>
                            人头狗
                        </div>
                        <div className="portrait">
                            <div className="add_new"><i className="icon-plus"></i></div><br/>
                        </div>
                    </div>
                    <div className="chset_group">
                        <div className="chset_item">
                            置顶聊天
                            <div className="switch_ui fr"></div>
                        </div>
                        <div className="chset_item">
                            消息免打扰
                            <div className="switch_ui fr"></div>
                        </div>
                        <div className="chset_item">
                            聊天文件
                        </div>
                    </div>
                    <div className="chset_group">
                        <div className="chset_item">
                            设置当前聊天背景
                        </div>
                        <div className="chset_item">
                            查找聊天记录
                        </div>
                    </div>
                    <div className="chset_group">
                        <div className="chset_item">
                            清空聊天记录
                        </div>
                    </div>
                    <div className="chset_group">
                        <div className="chset_item">
                            投诉
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    handleReturn(){
        var {router} = this.props;
        if(!router) router = this.props.context.router;

        router.push("/appview/home#/message")
    }
})

export default ChatSet;
