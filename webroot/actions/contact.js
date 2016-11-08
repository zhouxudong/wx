import Z_API from '../statics/js/api'
import Z_Util from '../statics/js/public'

function receiveContactList(contacts){
    return {
        type: "RECEIVE_CONTACTS",
        contacts
    }
}

export const apiContactList = (uid) => {
    return (dispatch) => {

        var url = Z_API.getContactList + "?uid=" + uid;
        Z_Util.fetch({
            url: Z_API.getContactList,
            data: {uid: uid},
            success: function(data){
                return dispatch(receiveContactList(data.response_data))
            }
        })
        //return fetch(url)
        //    .then(res => res.json())
        //    .then(json => dispatch(receiveContactList(json.response_data)))
    }
}