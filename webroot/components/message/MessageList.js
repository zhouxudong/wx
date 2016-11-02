import React from 'react'
import Message from './Message'


const MessageList = React.createClass({

    render(){
        var {messages,context} = this.props;
        return (

            <div className="MessageList">
                {
                    messages.map( msg => <Message key={"msg_" + msg.id + msg.ctype} message={msg}/>)
                }
            </div>
        )
    }
})
export default MessageList;
