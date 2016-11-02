import {connect} from 'react-redux'
import ContactBox from '../components/contact/ContactBox'
import {showView} from '../actions/home'
import {apiContactList} from "../actions/contact"
const mapStateToProps = (state)=> {
    var { home, routing } = state;
    return {
        view: home.view,
        belongto: home.belongto,
        contacts: home.contacts || [],
        option: home.option,
        routing
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        showView: (view,belongto) => {
            dispatch(showView(view,belongto))
        },
        getContactList: (uid) => {
            dispatch(apiContactList(uid))
        }
    }
}

var ContactBoxMap = connect(mapStateToProps,mapDispatchToProps)(ContactBox);

export default ContactBoxMap;