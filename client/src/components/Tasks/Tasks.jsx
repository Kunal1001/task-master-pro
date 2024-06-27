import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import "./Tasks.css"

export function TaskCardForAdmin(props){

    const [task, setTask] = useState(props.task.replace("(","").replace(")","").split(","))

    return (
        <div className={`task-card ${task[3]==='t'?"green":"orange"}`}>
            <div className="task-head-admin">
                {task[3]==='t'?<h2>Completed</h2>:<h2>ToDo</h2>}<hr />
            </div>
            <div className="content">
                {task[1]}
            </div>
            <div className="info">
                To User : {task[0]}
            </div>
            <div className="info">
                created on : {task[2]}
            </div>
        </div>
    )

}

export function TaskCardForUser(props){

    console.log(props);
    const [bgColor, setBgColor] = useState(props.task.iscompleted?"green":"orange")
    const [iscompleted, setIsCompleted] = useState(props.task.iscompleted?true:false)

    async function taskCompleted(){
        setIsCompleted(true);
        setBgColor("green")
        await axios.post("http://localhost:3000/api/v1/data//user/projects/task/comleted",{
            email:props.task.touser,
            content:props.task.content,
            projectid:props.projectid
        })
        props.taskCompleted()
    }

    return (
        <div className={`task-card ${bgColor}`}>
            <div>
                {iscompleted?
                <div className="task-head">
                    <h2>Completed</h2>
                </div>:
                <div className="task-head">
                    <h2>ToDo</h2>
                    <button onClick={
                        taskCompleted
                    }>Done</button>
                </div>}<hr />
            </div>
            <div className="content">
                {props.task.content}
            </div>
            <div className="info">
                Assign On : {props.task.createdon.split("T")[0]}
            </div>
        </div>
    )

}

export function NewTask(props){

    const [users, setUsers] = useState([
        {
            email:"",
            username:""
        }
    ])
    const [formdata, setFormData] = useState({
        content:"",
        email:""
    })

    function onChange(e){
        const {id, value} = e.target;
        setFormData({
            ...formdata,
            [id]:value
        })
    }

    async function addTask(e){
        e.preventDefault();
        await axios.post("http://localhost:3000/api/v1/data/admin/post/projects/task",{
            "email":formdata.email,
            "content":formdata.content,
            "projectid":props.projectid
        })
        props.onAdd()

    }

    async function getUsers(){

        const result = await axios.get("http://localhost:3000/api/v1/user/getusers");
        setUsers(result.data.result)

    }

    useEffect(()=>{

        getUsers()

    },[]) 

    return (
        <div className="new-task">
             <form className="task-form-container" onSubmit={addTask}>
                <textarea placeholder="Enter New Task" id="content" 
                    value={formdata.content}
                    onChange={onChange}
                    required
                />
                <select placeholder="select user" id="email"
                    onChange={onChange} required
                >
                    <option value="" disabled selected>Select user</option>

                    {
                        users?.map((item,indx)=>(
                            <option key={indx} value={item.email}>{item.username}</option>
                        ))
                    }

                </select>
                <button type="submit">Assign Task</button>
             </form>
        </div>
    )

}