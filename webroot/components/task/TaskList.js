import React from 'react';
import Task from './Task'

const TaskList = React.createClass({
    componentDidMount(){
        this.props.getInitTasks(1);
    },
    render(){
        var { tasks } = this.props;
        return (
            <div className="tasklist">
                {
                    tasks.map((task,i) => <Task {...this.props} key={"task_" + i} task={task}/>)
                }
            </div>
        )
    }
})
export default TaskList;