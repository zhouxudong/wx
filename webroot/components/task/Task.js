import React,{ Component } from 'react';

class Task extends Component{
    constructor(props) {
        super(props);
        this._modalSubmit = this._modalSubmit.bind(this);
    }
    _modalSubmit(subPage) {
        var { task,onEditTask } = this.props;
        var content = subPage.querySelector('[data-name=content]').value;
        content = content.replace(/\n/g,'<br>');
        onEditTask(task,content);
    }
    render(){
        let {task,onDelTask,showModal_dispatch} = this.props;
        var content = task.content ? task.content.replace(/<br>/g,'\n') : "";
        var modalEl = (
            <div>
                <textarea defaultValue={content} style={{height: "115px", width: "100%"}} type="text" data-name="content" className="form-control" placeholder="请输入任务内容"/>
            </div>
        )
        var title = `请输入${task.date}任务完成情况`;
        return (
            <div className="task_box">
                {task.date}
                <br/>
                {task.week}
                <br/>
                <button onClick={(e) => {
                    e.stopPropagation();
                    //onEditTask(task.id);
                    showModal_dispatch(modalEl,this._modalSubmit,title);
                }} className="btn btn-sm">编辑</button>
                {" "}
                <button onClick={()=>{onDelTask(task.id)}} className="btn btn-sm">删除</button>
            </div>
        )
    }
}

export default Task;