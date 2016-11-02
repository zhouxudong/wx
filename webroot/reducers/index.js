import React from 'react'
import { combineReducers } from 'redux'
import task from './task'
import home from './home'
import { routerReducer } from 'react-router-redux'

const commonCompReducer = (state={showModal:false},action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return Object.assign({},state,{
                showModal: true,
                modalEl:action.modalEl,
                handleSubmit: action.handleSubmit,
                title: action.title
            })
        case 'HIDDEN_MODAL':
            return Object.assign({},state,{
                showModal: false,
                modalEl: (<div></div>)
            })
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    commonCompReducer,
    task,
    home,
    routing: routerReducer
})
export default rootReducer;