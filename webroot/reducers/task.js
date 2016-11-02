
const task = (state = [], action) => {
    switch (action.type){
        case "ADD_TASK":
            return [
                ...state,
                {
                    id: action.id,
                    content: action.task
                }
            ]
        case "EDIT_TASK":
            console.log(action);
            return state.map((task) => {
                if(task.id == action.id){
                    return Object.assign({},task,{
                        content:action.task
                    });
                }
                return task;
            })
        case "DEL_TASK":
            return state.filter((task) => {
                if(task.id == action.id) return false;
                return true;
            })
        case "REQUEST_TASK":
            return state;
        case "RECEIVE_TASK":
            return action.tasks;
        default:
            return state;
    }
}

export default task;