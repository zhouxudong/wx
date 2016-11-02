import React from 'react'
import Z_Util from '../statics/js/public'
const RoutApp =  React.createClass({
    render(){
        var {children} = this.props;
        return (
            <div id="appview">
                <header id="header" className="header">
                    <span className="fl">JDT</span>
                    <div className="fr">
                        <i className="icon-search"></i>
                        <i className="icon-plus"></i>
                    </div>
                </header>
                {children}
                <footer onClick={this.handleNavClick} id="footer" className="footer">
                    <div data-target="home_1" className="ftnav home_1 active">
                        <div className="navItem">
                            <i className="icon-home"></i><br/>
                            首页
                        </div>
                    </div>
                    <div data-target="home_2" className="ftnav home_2">
                        <div className="navItem">
                            <i className="icon-users"></i><br/>
                            通讯录
                        </div>
                    </div>
                    <div data-target="home_3" className="ftnav home_3">
                        <div className="navItem">
                            <i className="icon-book-open"></i><br/>
                            发现
                        </div>
                    </div>
                    <div data-target="home_4" className="ftnav home_4">
                        <div className="navItem">
                            <i className="icon-user"></i><br/>
                            我
                        </div>
                    </div>
                </footer>
            </div>
        )
    },
    handleNavClick(event){
        var Z = Z_Util,
            el = event.target,
            boxs_wraper = document.querySelector(".boxs_wraper"),
            ftnav = document.querySelectorAll(".ftnav");
        Z.removeClass(ftnav,"active");

        var $ = function(cls){
            return document.querySelector(cls)
        }

        if(Z.belongClass(el,"home_1")){
            Z.addClass($(".home_1"),"active");
            boxs_wraper.style.transform = "translateX(0%)";
        }else if(Z.belongClass(el,"home_2")){
            Z.addClass($(".home_2"),"active");
            boxs_wraper.style.transform = "translateX(-25%)"
        }else if(Z.belongClass(el,"home_3")){
            Z.addClass($(".home_3"),"active");
            boxs_wraper.style.transform = "translateX(-50%)"
        }else if(Z.belongClass(el,"home_4")){
            Z.addClass($(".home_4"),"active");
            boxs_wraper.style.transform = "translateX(-75%)"
        }

    }
})

export default RoutApp