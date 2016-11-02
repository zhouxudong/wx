import React from 'react'

var packScroll = function(IscrollWraper){
    return React.createClass({
        timestamp: 0,
        startY: 0,
        endY: 0,
        render: function(){
            var touchEvents = {
                touchStart: this.touchStart,
                touching: this.touching,
                touchEnd: this.touchEnd
            }
            return <IscrollWraper {...this.props} {...touchEvents}/>
        },
        touchStart(e){
            this.timestamp = new Date().getTime();
            this.startY = e.targetTouches[0].clientY;
            this.endY = this.startY;
        },
        touching(e){
            this.endY = e.targetTouches[0].clientY;
        },
        touchEnd(e,cb){

            var timeDiff = new Date().getTime() - this.timestamp;
            var yDiff = this.endY == 0 ? 0 : (this.endY - this.startY);
            if(timeDiff < 200 && Math.abs(yDiff) < 20){
                if(cb) cb();
            }
        },

    })
}
export {packScroll};