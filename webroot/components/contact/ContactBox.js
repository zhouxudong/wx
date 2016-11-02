import React from 'react'
import {render} from 'react-dom'
import Z_Util from '../../statics/js/public'
import ContactList from './ContactList'
import PersonInfo from './PersonInfo'                       //用户个人信息
import OfficialBox from '../official/OfficialBox'         //公众号容器
import OfficialSubject from "../official/OfficialSubject"//公众号主体
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'
require("../../statics/less/contact.less");

const ContactBox = React.createClass({
    contextTypes: {
        router: React.PropTypes.object,
        store: React.PropTypes.object,
        uid: React.PropTypes.number
    },
    getDefaultProps(){
        return ({
            options: {
                mouseWheel: true
            }
        })
    },
    componentWillReceiveProps(nextProps,nextContext){
        var {option,view,belongto,showView} = nextProps,
            prevHash = this.props.routing.locationBeforeTransitions.hash,
            nextHash = nextProps.routing.locationBeforeTransitions.hash,
            historyState = Z_Util.getHistoryState(prevHash, nextHash);
        if(belongto != "contact") return false;

        if(historyState == "reload" && !prevHash.startsWith(nextHash)){
            $("#subPage").empty();
        }

        console.log("contactbox 接收到的属性");
        console.log(nextProps)
        console.log("history 状态:" + historyState);
        if(historyState == "back"){
            if(view.endsWith("contact/personinfo")){
                var div1 = $("#subPage").find(".personinfo");
                Z_Util.runAnim(div1,"slideOutRight",function(){
                    div1.remove();
                })
            }
            if(view.endsWith("contact/official")){
                var div1 = $("#subPage").find(".official");
                Z_Util.runAnim(div1,"slideOutRight",function(){
                    div1.remove();
                })
            }
            if(view.endsWith("contact/official/detail")){
                var div1 = $("#subPage").find(".detail");
                Z_Util.runAnim(div1,"slideOutRight",function(){
                    div1.remove();
                    showView("contact/official","contact")
                })
            }
        }else{
            if(view.startsWith("contact/personinfo")){
                var div1 = $("<div class='personinfo'></div>");

                div1.appendTo("#subPage");
                render(<PersonInfo context={this.context} pid={option.pid}/>,div1[0]);

                if(historyState != "reload") Z_Util.runAnim(div1,"slideInRight");
            }
            if(view.startsWith("contact/official")){
                var div1 = $("<div class='official'></div>");

                div1.appendTo("#subPage");
                render(<OfficialBox context={this.context} />, div1[0]);

                if(historyState != "reload") Z_Util.runAnim(div1,"slideInRight");
            }
            if(view.startsWith("contact/official/detail")){
                var div1 = $("<div class='detail'></div>");
                div1.appendTo("#subPage");
                render(<OfficialSubject context={this.context} oid={option.oid} />, div1[0]);

                if(historyState != "reload") Z_Util.runAnim(div1,"slideInRight");
            }
        }
    },
    componentDidMount(){
        var {uid} = this.context;
        this.props.getContactList(uid);
    },
    render(){
        var {contacts} = this.props;
        contacts = Z_Util.sortNameByPy(contacts,"name");
        contacts = Z_Util.groupBy(contacts,"belong");
        return (
            <div id="contactbox" style={{height:"100%"}}>
                <ReactIScroll iScroll={iScroll} options={this.props.options} onScrollStart={this.onScrollStart}>
                    <ContactList usersgroup={contacts}/>
                </ReactIScroll>
            </div>
        )
    }
})


export default ContactBox;