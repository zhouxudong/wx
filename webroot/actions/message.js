import Z_API from '../statics/js/api'
import Z_Util from '../statics/js/public'

export const apiMessageList = (uid) => {
    return (dispatch) => {
        var url = Z_API.getMessageList + "?uid=" + uid;

        Z_Util.fetch({
            url: Z_API.getMessageList,
            data: {uid: uid},
            success: function(data){
                dispatch(receiveMessageList(data.response_data))
            }
        })
        //return fetch(url)
        //    .then(res => res.json())
        //    .then(json => dispatch(receiveMessageList(json.response_data)))
    }
}
function receiveMessageList(messages){
    return {
        type: "RECEIVE_MESSAGES",
        messages: messages
    }
}

export const intoMessage = function(messageid){
    return {
        type: 'INTO_MESSAGE',
        messageid
    }
}

export const intoChatBoxSeting = function(chatBoxID){
    return {
        type: 'INTO_CHATBOXSETING',
        chatBoxID
    }
}