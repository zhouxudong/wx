import React from 'react'
import {showView} from '../../actions/home'
import Z_API from "../../statics/js/api"

const PersonInfo = React.createClass({
    getInitialState(){
        return {
            user: {}
        }
    },
    contextTypes: {
        store: React.PropTypes.object,
        router: React.PropTypes.object
    },
    componentDidMount(){
        var {pid} = this.props;
        var url = Z_API.getUserInfo + "?id=" + pid;

        fetch(url)
            .then(res => res.json())
            .then(json => {
                if(json.response_data){
                    var data = json.response_data;
                    this.setState({
                        user: data
                    })
                }
            });

    },
    render(){
        var {user} = this.state;
        return (
            <div className="person_info viewItem">
                <div className="header">
                    <i onClick={this.handleReturn} className="icon-angle-left"></i> 详细资料
                    <i onClick={this.setMessage} className="icon-th-list fr"></i>
                </div>
                <div className="content">
                    <div className="perinfo bcfgroup">
                        <img className="partrait" src={user.portrait} width="42px" />
                        <p>{user.name} <i className="icon-venus" style={{color: "#ea433b"}}></i> </p>
                        <small>微信号: sxhjyyn</small>
                    </div>
                    <div className="bcfgroup">
                        <div className="group_item">
                            设置备注和标签
                        </div>
                    </div>
                    <div className="bcfgroup">
                        <div className="group_item">
                            地区：{user.address}
                        </div>
                        <div className="group_item">
                            个人相册
                        </div>
                        <div className="group_item">
                            更多
                        </div>
                    </div>
                    <div className="wp90 mauto">
                        <button onClick={e => {this.sendInfo(user.id)}} className="btn btn-block btn-with-theme mt20">发消息</button>
                        <button className="btn btn-block btn-default mt20">视频聊天</button>
                    </div>
                </div>
            </div>
        )
    },
    handleReturn(){
        var {router,store} = this.props.context;
        router.push("/appview/home");
    },
    sendInfo(pid){

        var {store, router} = this.props.context;
        store.dispatch(showView("message","message",{pid:pid}));
        router.push("/appview/home#/message")
    }
})

export default PersonInfo;