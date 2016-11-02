import React from 'react'
import Z_Util from '../statics/js/public'

/**
 * 商品展示列表
 * <Product_tpl key={"afterApply_" + i} data={product} canOt={true : false}/>
 * */
const Product_info_tpl = React.createClass({
    handleCheckClick(){
        let check = this.refs.check;
        Z_Util.toggleClass(check,"checked");
    },
    render(){
        let {canOt,data} = this.props;
        return(
            <div className="refund_item">
                <div className="item_l">
                    <span ref="check" onClick={canOt ? this.handleCheckClick : ""} className={"check_sicon checked " + (canOt ? "":"hidden")}></span>
                    <div className="imgWrap"><img width="80px" height="80px" src={data.thumb}/></div>
                </div>
                <div className="item_r">
                    <p className="prod_tit">{data.title}</p>
                    <span className="price">￥{parseFloat(data.price).toFixed(2)}</span>
                    <Opera_box data={data.num || data.count} canOt={canOt}/>
                </div>
            </div>
        )
    }
})

/**
 * 加减操作框
 * <Opera_box data={data.num || data.count} canOt={canOt}/>
 * */
const Opera_box = React.createClass({
    handleReduceClick(){
        let opera_num = this.refs.opera_num;
        let num = parseInt(opera_num.value);
        opera_num.value = (num > 1 ? num-1 : num);
    },
    handleAddClick(){
        let opera_num = this.refs.opera_num;
        let num = parseInt(opera_num.value);
        let max = parseInt(opera_num.dataset.max);
        opera_num.value = (num >= max ? max : num + 1);
    },
    render(){
        let {canOt,data} = this.props;

        return(
            <div className={"opera_box " + (canOt ? "":"not_opt")}>
                <span onClick={this.handleReduceClick} className="opera_item reduce">-</span>
                {canOt ? "" : "退货数量:"}
                <input ref="opera_num" type="text"  defaultValue={data} data-max={data} className="opera_num" disabled=""/>
                <span onClick={this.handleAddClick} className="opera_item add">+</span>
            </div>
        )
    }
})
/*
 let table = (
 <div><p>ac</p></div>
 )
 modal(table);
 */
const Modal = React.createClass({
    render(){
        let {title,children,style,modalCancel,modalSubmit} = this.props;
        return (
            <div id="modal_wraper" className="modal_wraper">
                <div className="modal" onClick={modalCancel}></div>
                <div className="modal_box" style={style}>
                    <div className="modal_header">{title}</div>
                    <div className="modal_content">
                        {children}
                    </div>
                    <div className="tc">
                        <button onClick={modalSubmit} className="btn btn-sm btn-with-theme">确定</button>
                        {" "}
                        <button onClick={modalCancel} className="btn btn-sm btn-with-theme">取消</button>
                    </div>
                </div>
            </div>
        )
    }
})

/**
 *  自定义alert覆盖原生的
 * */
const Alert = React.createClass({
    render(){
        let { msg,alertClick } = this.props;
        return (
            <div id="alert_wraper" ref="alert_wraper" className="alert_wraper">
                <div className="modal" onClick={alertClick}></div>
                <div className="alert_box">
                    <div className="alert_content">{msg}</div>
                    <div className="tc">
                        <button onClick={alertClick} className="btn btn-sm btn-with-theme">确定</button>
                    </div>
                </div>
            </div>
        )

    }
})

/**
 *  自定义进度条
 * */
const Progressbar = React.createClass({
    render(){
        let width = this.props.width;
        return (
            <div className="progress">
                <div style={{width:width}} className="progress-bar"/>
            </div>
        )
    }
})

/**
 * render(<Loading handleLoadingClick={this.handleLoadingClick}/>,this.refs.loadingWrap)
 * unmountComponentAtNode(this.refs.loadingWrap);
 */
const Loading = React.createClass({

    drawRound(cxt,radius,r,d,j){
        var fillColor = "#FF" + (j+"").repeat(4);
        var x = Math.cos(Math.PI/180*radius) * d;
        var y = Math.sin(Math.PI/180*radius) * d;
        cxt.fillStyle = fillColor;
        cxt.beginPath();
        cxt.arc(x,y,r,0,Math.PI*2,true);
        cxt.fill();
        cxt.closePath();
    },
    componentDidMount(){
        var _this = this,
            canvas = this.refs.canvas,
            cxt = canvas.getContext("2d"),
            d = 30,
            r = 10,
            radius = 0;

        cxt.rotate(Math.PI/180*radius);
        this.interval = setInterval(function(){
            radius += 5;
            cxt.save();
            cxt.clearRect(0,0,100,100);
            cxt.translate(50,50);
            cxt.rotate(Math.PI/180*radius);
            for(var i = 0,j=0;i<=360;i+=45,j++){
                _this.drawRound(cxt,i,r,d,j)
            }
            cxt.restore();
        },100)
    },
    componentWillUnmount(){
        clearInterval(this.interval);
    },
    render(){
        return (
            <div id="loading_wraper" ref="loading_wraper" className="loading_wraper">
                <div className="modal"></div>
                <div className="loadingCont"><canvas ref="canvas" width="100" height="100"></canvas></div>
            </div>
        )
    }
})
export {
    Modal,
    Alert,
    Progressbar,
    Loading,
    Opera_box,
    Product_info_tpl as Product_tpl
}