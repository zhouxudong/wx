import Z_API from '../statics/js/api'

function receiveUinfo(uinfo){
    return {
        type: "RECEIVE_UINFO",
        uinfo
    }
}

export const apiUinfo = (uid) => {
    return (dispatch) => {
        var url = Z_API.getUserInfo + "?id=" + uid;

        fetch(url)
            .then(res => res.json())
            .then(json => {
                dispatch(receiveUinfo(json.response_data));
            })
    }
}