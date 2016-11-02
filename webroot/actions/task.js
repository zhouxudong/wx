import Z_API from '../statics/js/api'
import Z_Util from '../statics/js/public'

function addTaskPre() {
    return {
        type: "ADD_TASK_PRE",
    }
}

export const apiAddTask = (task,content) => {
    return (dispatch) => {
        dispatch(addTaskPre());
        var params = Z_Util.objToMap({uid:task.uid,content:content,fordate:task.date});
        params = Z_Util.params(params);
        var url = `${Z_API.addTask}?${params}`;
        return fetch(url)
            .then(res => res.json())
            .then(json => dispatch(fetchTasks(task.uid)))
    }
}

function editTaskPre() {
    return {
        type: 'EDIT_TASK_PRE'
    }
}
export const apiEditTask = (task,content) => {
    return (dispatch) => {
        dispatch(editTaskPre());
        var params = Z_Util.objToMap({id:task.id,content:content});
        params = Z_Util.params(params);
        var url = `${Z_API.editTask}?${params}`;
        return fetch(url)
            .then(res => res.json())
            .then(json => {
                if(json.status) dispatch(fetchTasks(task.uid))
            })
    }
}

export const delTask = (id) => {
    return {
        type: 'DEL_TASK',
        id
    }
}

export const requestTask = () =>{
    return {
        type: 'REQUEST_TASK'
    }
}

function receiveTask(uid,json) {
    return {
        type: 'RECEIVE_TASK',
        isFetching: true,
        tasks: json.data,
        uid
    }
}

export const fetchTasks = (uid) => {
    return (dispatch) => {
        dispatch(requestTask());

        var url = Z_API.getTasksByUID + uid;
        return fetch(url)
            .then((res) => res.json())
            .then(json => dispatch(receiveTask(uid,json)))
    }
}