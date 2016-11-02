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
        return fetch(url)
            .then(res => res.json())
            .then(json => dispatch(receiveContactList(json.response_data)))
    }
}