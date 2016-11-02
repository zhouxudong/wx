import React from 'react';
import {render} from 'react-dom';
import ChatSet from '../chat/ChatSet';
import Z_Util from '../../statics/js/public'
import Z_API from "../../statics/js/api"

import {showView} from '../../actions/home'
require("../../statics/less/chatbox.less");

const ChatBox = React.createClass({
    getInitialState(){
        return {
            chats: [],
            uinfo: {}
        }

    },
    componentDidMount(){
        var {uid} = this.props.context;
        var {pid} = this.props;

        this.apiChatCont(uid,pid);
        this.apiPersonInfo(pid);
    },
    apiPersonInfo(pid){
        var url = Z_API.getUserInfo + "?id=" + pid

        fetch(url)
        .then(res => res.json())
        .then(json => {
            if(json.response_data){
                this.setState({
                    uinfo: json.response_data
                })
            }
        })
    },
    apiChatCont(uid,pid){
        var url = Z_API.getChatCont + "?uid=" + uid + "&pid="  + pid;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if(json.response_data){
                    var data = json.response_data;
                    this.setState({
                        chats: data
                    })
                }
            });
    },
    render(){

        var {chats,uinfo} = this.state;
        var {uid} = this.props.context;
        return (
            <div ref="chatBox" className="chatbox viewItem">
                <div className="header">
                    <i onClick={this.handleReturn} className="icon-angle-left"></i> {uinfo.name}
                    <i onClick={this.setMessage} className="icon-user fr"></i>
                </div>
                <div className="chatpanel content">
                    {
                        chats.map( chat => {
                            return (
                                <div key={chat.id} className={chat.uid == uid ? "chatItem self" :"chatItem other"}>
                                    <img src={chat.portrait} width="42px"/>
                                    <div className="chat_content">
                                        {chat.sendInfo}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="footer">
                    <div className="circle ime">
                        <i className="icon-volume-up"></i>
                    </div>
                    <input type="text" className="form-control sendmsg"/>
                    <div className="send_icon">
                        <button className="btn btn-sm btn-primary">发送</button>{" "}
                        <div className="circle ml10">
                            <i className="icon-emo-happy"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    handleReturn(){
        var {router} = this.props.context;

        router.push("/appview/home");
    },
    setMessage(){

        var {router,store} = this.props.context;

        store.dispatch(showView("message/chatbox","message"));

        router.push("/appview/home#/message/chatbox");

    }
})
export default ChatBox;