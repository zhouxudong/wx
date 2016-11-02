import React from 'react'
import {findDOMNode} from 'react-dom'
import {showView} from '../../actions/home'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'

const CircleFriends_cont = React.createClass({
    componentDidMount(){
        var {content} = this.refs;
        var circle = $(content).height();
        console.log(circle);
    },
    render(){
        return (
            <div ref="content" className="content">
                <div className="friend_bg">
                    <div className="bgWraper">
                        <img src="/statics/images/friendbg.jpg" width="100%"/>
                    </div>
                    <div className="my_pt_wrap"><img className="portrait" src="/statics/images/webwxgeticon.jpg" width="100%" /></div>
                </div>
                <div className="friendGroup">
                    <img className="frd_portrait" src="/statics/images/portrait.png" />
                    <div className="friend_cont">
                        <p>三元</p>
                        <div className="cont">每个SB心里都有无数个为什么、为什么？</div>
                        <div className="friend_foot">
                            <small>1小时前</small>
                            <i className="icon-thumbs-up fr"></i>
                        </div>
                    </div>
                </div>
                <div className="friendGroup">
                    <img className="frd_portrait" src="/statics/images/dage.jpg" />
                    <div className="friend_cont">
                        <p>大哥</p>
                        <div className="cont">
                            每个SB心里都有无数个为什么、为什么？
                            <div className="cont_img">
                                <img src="/statics/images/xiaoqingxu.jpg" />
                            </div>
                        </div>
                        <div className="friend_foot">
                            <small>1小时前</small>
                            <i className="icon-thumbs-up fr"></i>
                        </div>
                    </div>
                </div>
                <div className="friendGroup">
                    <img className="frd_portrait" src="/statics/images/dage.jpg" />
                    <div className="friend_cont">
                        <p>大哥</p>
                        <div className="cont">
                            每个SB心里都有无数个为什么、为什么？
                            <div className="cont_img">
                                <img src="/statics/images/xiaoqingxu.jpg" />
                            </div>
                        </div>
                        <div className="friend_foot">
                            <small>1小时前</small>
                            <i className="icon-thumbs-up fr"></i>
                        </div>
                    </div>
                </div>
                <div className="friendGroup">
                    <img className="frd_portrait" src="/statics/images/dage.jpg" />
                    <div className="friend_cont">
                        <p>小琪</p>
                        <div className="cont">
                            宝宝心里苦  on_on
                            <div className="cont_img">
                                <img src="/statics/images/xiaoqingxu.jpg" />
                            </div>
                        </div>
                        <div className="friend_foot">
                            <small>1小时前</small>
                            <i className="icon-thumbs-up fr"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
const CircleFriends = React.createClass({
    getDefaultProps(){
        return ({
            options: {
                mouseWheel: true,
                scrollbars: false
            }
        })
    },
    render(){
        var docHeight = $(window).height() - 45;
        return (
            <div id="circle_friend">
                <div className="circle_friend viewItem">
                    <div className="header">
                        <i onClick={this.handleReturn} className="icon-angle-left"></i> 朋友圈
                        <i onClick={this.setMessage} className="icon-camera fr"></i>
                    </div>
                    <div style={{height:"calc(100% - 45px)"}}>
                        <ReactIScroll ref="scroller" iScroll={iScroll} options={this.props.options} onScrollStart={this.onScrollStart}>
                            <CircleFriends_cont />
                        </ReactIScroll>
                    </div>
                </div>
            </div>
        )
    },
    handleReturn(){
        var {store, router} = this.props.context;

        router.push("/appview/home");
    }
})
export default CircleFriends;