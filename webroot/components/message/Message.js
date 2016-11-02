import React from 'react'
import { showView } from '../../actions/home'
import {packScroll} from "../higherComp";
const Message = React.createClass({
    contextTypes: {
        router: React.PropTypes.object,
        store: React.PropTypes.object,
        uid: React.PropTypes.number
    },
    render(){
        var {message, handleClickMessage, touchStart, touching, touchEnd} = this.props;
        var { router, store, uid} = this.context;
        var timeStr = "";
        var chatTime = new Date(message.ctime).getTime();
        var diffTime = new Date().getTime() - chatTime;

        if(diffTime < 1000 * 60){
            timeStr = "刚刚";
        }else if(diffTime < 1000 * 60 * 60){
            timeStr = parseInt(diffTime/(60*1000)) + "分钟前";
        }else if(diffTime < 1000 * 60 * 60 * 24){
            timeStr = parseInt(diffTime/(60 * 60 * 1000)) + "小时前";
        }else if(diffTime < 1000 * 60 * 60 * 24 * 30){
            timeStr = parseInt(diffTime/(1000 * 60 * 60 * 24)) + "天前";
        }else if(diffTime < 1000 * 60 * 60 * 24 * 30 * 12){
            timeStr = parseInt(diffTime/(1000 * 60 * 60 * 24 * 30)) + "月前";
        }
        return(
            <div ref="message" data-ctype={message.ctype} data-mid={message.uid == uid ? (message.contact_id || message.oid) : message.uid} className="message"
                 onTouchEnd={ e => {
                    var toMessage = this.toMessage;
                    touchEnd(e,this.toMessage)
                 }}
                 onTouchStart={touchStart}
                 onTouchMove={touching}>
                <img className="portrait" src={message.portrait || message.logo} />
                <p className="maintit" style={1 == 2 ? {color:'#38f'}: {}}>{message.name}</p>
                <small>{message.sendInfo}</small>
                <span className="time">{timeStr}</span>
            </div>
        )
    },
    toMessage(){
        var { router, store} = this.context;
        var {message} = this.refs;
        var $element = $(message);

        var pid = $element.data("mid");
        var ctype = $element.data("ctype");
        store.dispatch(showView("message","message",{pid: pid,ctype: ctype}));
        router.push("/appview/home#/message");
    }
})

export default packScroll(Message);