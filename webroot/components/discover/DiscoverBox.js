import React from 'react'
import {render} from 'react-dom'
import CircleFriends from './CircleFriends'
import Z_Util from '../../statics/js/public'
require('../../statics/less/discover.less');

const DiscoverBox = React.createClass({
    contextTypes: {
        router: React.PropTypes.object,
        store: React.PropTypes.object
    },
    componentWillReceiveProps(nextProps, nextContext){
        var {view,showView,belongto} = nextProps,
            prevHash = this.props.routing.locationBeforeTransitions.hash,
            nextHash = nextProps.routing.locationBeforeTransitions.hash,
            historyState = Z_Util.getHistoryState(prevHash, nextHash);
        if(belongto != "discover") return false;
        if(historyState == "reload" && !prevHash.startsWith(nextHash)){
            $("#subPage").empty();
        }
        console.log("discoverBox 接受到的属性");
        console.log(nextProps);
        console.log("history操作： " + historyState);

        if(historyState == "back"){
            if(view.endsWith("discover/friends")){
                var div2 = $("#subPage").find(".sub_discover");
                Z_Util.runAnim(div2,"slideOutRight",function(){
                    div2.remove();
                    showView("","home");
                })
            }
        }else{
            if(view.startsWith("discover/friends") && $("#subPage").find(".sub_discover").length == 0){
                var div1 = $("<div class='sub_discover'></div>");

                div1.appendTo("#subPage");
                render(<CircleFriends context={this.context} />,div1[0]);

                if(historyState != "reload") Z_Util.runAnim(div1,"slideInRight");
            }
        }
    },
    render(){
        return (
            <div id="discoverbox">
                <div className="dser_group">
                    <div onClick={this.toFriends} className="dser_item">
                        <i className="icon-book"></i> 朋友圈
                    </div>
                </div>
                <div className="dser_group">
                    <div className="dser_item">
                        <i className="icon-eye"></i> 扫一扫
                    </div>
                    <div className="dser_item">
                        <i className="icon-thumbs-up"></i> 摇一摇
                    </div>
                </div>
                <div className="dser_group">
                    <div className="dser_item">
                        <i className="icon-home-outline"></i> 附近的人
                    </div>
                    <div className="dser_item">
                        <i className="icon-location"></i> 漂流瓶
                    </div>
                </div>
                <div className="dser_group">
                    <div className="dser_item">
                        <i className="icon-basket"></i> 购物
                    </div>
                    <div className="dser_item">
                        <i className="icon-emo-happy"></i> 游戏
                    </div>
                </div>
            </div>
        )
    },
    toFriends(){
        var {showView} = this.props;
        var {router} = this.context;

        showView("discover/friends","discover");
        router.push("/appview/home#/discover/friends")
    }
})

export default DiscoverBox;