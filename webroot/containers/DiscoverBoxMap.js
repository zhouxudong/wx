import {connect} from 'react-redux'
import DiscoverBox from "../components/discover/DiscoverBox"
import {showView} from '../actions/home'
const mapStateToProps = (state) => {
    var { home, routing } = state;
    return {
        view: home.view,
        belongto: home.belongto,
        routing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showView: (view,belongto) => {
            dispatch(showView(view,belongto))
        }
    }
}

var DiscoverBoxMap = connect(mapStateToProps,mapDispatchToProps)(DiscoverBox);

export default DiscoverBoxMap;