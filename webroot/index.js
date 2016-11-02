import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import React from 'react'
import { render }from 'react-dom'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import rootReducer from './reducers'
//import Main from './components/Main'
import MainMap from './containers/MainMap'
import RouteApp from './components/RouteApp'
import TaskPage from './components/task/TaskPage'
import Login from './components/passport/Login'
import Regist from './components/passport/Regist'
import Reusername from './components/passport/Reusername'
import Repassword from './components/passport/Repassword'
import Passport from './components/passport/Passport'
import Home from './components/home/Home'
//import TaskPageMap from './containers/TaskPageMap'

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
const history = syncHistoryWithStore(browserHistory, store);
setTimeout(function(){
    $("#wxstartimg").remove();
    render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={MainMap}>
                    <Route path="appview" component={RouteApp}>
                        <Route path="tasks" component={TaskPage} />
                        <Route path="home" component={Home} />
                    </Route>
                    <Route path="passport" component={Passport}>
                        <Route path="login" component={Login}/>
                        <Route path="regist" component={Regist}/>
                        <Route path="reusername" component={Reusername}/>
                        <Route path="repassword" component={Repassword}/>
                    </Route>
                </Route>
            </Router>
        </Provider>,
        document.getElementById("root")
    )
},200)


//console.log(store.getState());
//var unsubscribe = store.subscribe(()=>{console.log(store.getState())});
//
//store.dispatch(requestPosts(1))
//store.dispatch(fetchPosts(1)).then(()=>
//    console.log(store.getState())
//)

//render(
//    <Provider store={store}>
//        <App />
//    </Provider>,
//    document.getElementById("root")
//)

//console.log(store.getState());
//var unsubscribe = store.subscribe(()=>{console.log(store.getState())});
//store.dispatch(addTask("success 1"));
//store.dispatch(addTask("success 2"));
//store.dispatch(addTask("success 3"));
//store.dispatch(editTask(1,"success over edit"));
//store.dispatch(delTask(2));
//unsubscribe();
