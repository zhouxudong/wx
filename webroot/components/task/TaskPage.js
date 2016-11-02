import React from 'react'
import TaskListMap from '../../containers/TaskListMap'
require("../../statics/less/task.less");
const TaskPage = React.createClass({
    render(){
        return (
            <TaskListMap {...this.props}/>
        )
    }
})

export default TaskPage;