import { connect } from 'react-redux'
import Main from "../components/Main"
import { showModal,hiddenModal } from '../actions'
import {showView} from '../actions/home'

const mapStateToProps = (state) => {
    var {commonCompReducer,routing} = state;
    return {
        showModal: commonCompReducer.showModal,
        modalEl: commonCompReducer.modalEl,
        handleSubmit: commonCompReducer.handleSubmit,
        title: commonCompReducer.title,
        routing
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => {
            dispatch(hiddenModal())
        },
        showView: (view,belongto) => {
            dispatch(showView(view,belongto))
        }
    }
}


const MainMap = connect(mapStateToProps,mapDispatchToProps)(Main);

export default MainMap;