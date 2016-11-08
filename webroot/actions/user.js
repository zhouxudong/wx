import Z_API from '../statics/js/api'
import Z_Util from "../statics/js/public"

function receiveUinfo(uinfo){
    return {
        type: "RECEIVE_UINFO",
        uinfo
    }
}

export const apiUinfo = (uid) => {
    return (dispatch) => {
        var url = Z_API.getUserInfo + "?id=" + uid;

        Z_Util.fetch({
            url: Z_API.getUserInfo,
            data: {id: uid},
            success: function(data){
                dispatch(receiveUinfo(data.response_data));
            }
        })

        //fetch(url)
        //    .then(res => res.json())
        //    .then(json => {
        //        dispatch(receiveUinfo(json.response_data));
        //    })
    }
}