import { connect } from 'react-redux'
import { delTask,apiEditTask,fetchTasks,apiAddTask} from '../actions/task'
import { showModal } from '../actions'
import TaskList from '../components/task/TaskList'

const mapStateToProps = (state) => {
    return {
        tasks: state.task
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onDelTask: (id) => {
            dispatch(delTask(id));
        },
        onEditTask: (task,content) => {
            if(task.id){
                dispatch(apiEditTask(task,content));
            }else{
                dispatch(apiAddTask(task,content));
            }

        },
        showModal_dispatch: (modalEl,handleSubmit,title) => {
            dispatch(showModal(modalEl,handleSubmit,title))
        },
        getInitTasks: (uid) => {
            dispatch(fetchTasks(uid));
        }
    }
}

const TaskListMap = connect(mapStateToProps,mapDispatchToProps)(TaskList);

export default TaskListMap;