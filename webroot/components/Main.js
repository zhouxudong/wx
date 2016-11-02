import React from 'react'
import { unmountComponentAtNode,render } from 'react-dom'
import { Modal } from './Common'
import Z_Util from '../statics/js/public'
require("../statics/less/common.less");
require("../statics/less/subpage.less");
require("../statics/css/animate.css");


const Main = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    childContextTypes: {
        color: React.PropTypes.string,
        subPages: React.PropTypes.string,
        uid: React.PropTypes.number
    },
    getChildContext(){
        var {subPage} = this.refs;
        return {
            color: "purple",
            subPages: "#subPage",
            uid: 1
        }
    },
    modalSubmit(){
        var subPage = this.refs.subPage;
        this.props.handleSubmit(subPage);
        this.modalCancel();
    },
    modalCancel(){
        this.props.hideModal();
        unmountComponentAtNode(this.refs.subPage);
    },
    componentWillReceiveProps(nextprops){
        var subPage = this.refs.subPage;
        var title = nextprops.title;
        var modalData = {
            title: title,
            children: nextprops.modalEl,
            style: {width: '220px'},
            modalCancel: this.modalCancel,
            modalSubmit: this.modalSubmit
        }
        if(nextprops.showModal){
            render(<Modal {...modalData}/>,subPage);
        }
    },
    componentDidMount(){

        var {showView} = this.props,
            {hash} = this.props.routing.locationBeforeTransitions,
            {pathname} = this.props.location,
            {router} = this.context,
            hashStr = hash.substring(2);
        var firstPath = Z_Util.getFirstPath(hashStr);

        if(pathname == "/") router.push("/passport/login");
        else {
            if(hashStr) showView(hashStr,firstPath);
            else{
                showView("/home","home");
                router.push("/appview/home");
            }
        }
    },
    render(){
        var { children } = this.props;
        return (
            <div id="main">
                {children}
                <div ref="subPage" id="subPage"/>
            </div>
        )
    }
})
export default Main;