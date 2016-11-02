import {connect} from 'react-redux'
import MeBox from '../components/me/MeBox';
import {showView} from '../actions/home'
import {apiUinfo} from '../actions/user'
var mapStateToProps = (state) => {
    var {home} = state;
    return {
        uinfo: home.uinfo || {}
    }
}
var mapDispatchToProps = (dispatch) => {
    return {
        showView: (view,belong,opption) => {
            dispatch(showView(view,belong,opption))
        },
        getUinfo: (uid) => {
            dispatch(apiUinfo(uid))
        }
    }
}
var MeBoxMap = connect(mapStateToProps,mapDispatchToProps)(MeBox);

export default MeBoxMap;