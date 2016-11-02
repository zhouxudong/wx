import React from 'react'
import Z_API from '../../statics/js/api'
import {showView} from "../../actions/home"
const OfficialSubject = React.createClass({

    getInitialState(){
        return {
            oficial: {}
        }
    },
    componentDidMount(){
        var {oid} = this.props;
        $.ajax({
            url: Z_API.getSubScriberInfo + "?id=" + oid,
            success: function(data){
                this.setState({
                    oficial: data.response_data
                })
            }.bind(this)
        })
    },
    render(){
        var {oficial} = this.state;
        return (
            <div className="chatbox viewItem">
                <div className="header">
                    <i onClick={this.handleReturn} className="icon-angle-left"></i> {oficial.name}
                    <i onClick={this.setMessage} className="icon-user fr"></i>
                </div>
                <div className="chatpanel content">
                    <div className="offi_mess">
                        <div className="mess_item">
                            抽他个济州岛，再抢他个失散多年的马尔代夫
                        </div>
                        <div className="mess_item">
                            金秋鲜果香 特价鲜果每日享，买1赠1送不停！
                        </div>
                        <div className="mess_item">
                            中秋好礼整箱购，乳品疯狂大聚惠，三元牛奶满69减10
                        </div>
                    </div>
                    <div className="offi_mess">
                        <div className="mess_item">
                            抽他个济州岛，再抢他个失散多年的马尔代夫
                        </div>
                        <div className="mess_item">
                            金秋鲜果香 特价鲜果每日享，买1赠1送不停！
                        </div>
                        <div className="mess_item">
                            中秋好礼整箱购，乳品疯狂大聚惠，三元牛奶满69减10
                        </div>
                    </div>
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
        var {router, store} = this.props.context;

        router.push("/appview/home");
    }
})
export default OfficialSubject;