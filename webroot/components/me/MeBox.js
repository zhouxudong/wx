import React from 'react'

const MeBox = React.createClass({
    contextTypes: {
        router: React.PropTypes.object,
        store: React.PropTypes.object,
        uid: React.PropTypes.number
    },
    componentDidMount(){
        var {uid} = this.context;
        this.props.getUinfo(uid);
    },
    render(){
        var {uinfo} = this.props;
        return (
            <div id="mebox">
                <div className="me_group userinfo">
                    <div className="me_item">
                        <img src={uinfo.portrait} width="42px"/>
                        <p className="title">{uinfo.name}</p>
                        <small style={{color: "#888"}}>微信号： {uinfo.alias}</small>
                    </div>
                </div>
                <div className="me_group">
                    <div className="me_item">
                        <i className="icon-camera"></i> 相册
                    </div>
                    <div className="me_item">
                        <i className="icon-box"></i> 收藏
                    </div>
                </div>
                <div className="me_group">
                    <div className="me_item">
                        <i className="icon-briefcase"></i> 钱包
                    </div>
                    <div className="me_item">
                        <i className="icon-cc-visa"></i> 卡包
                    </div>
                </div>
                <div className="me_group">
                    <div className="me_item">
                        <i className="icon-emo-happy"></i> 表情包
                    </div>
                </div>
                <div className="me_group">
                    <div className="me_item">
                        <i className="icon-cog"></i> 设置
                    </div>
                </div>
            </div>
        )
    }
})

export default MeBox;