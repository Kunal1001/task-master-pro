import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import "./Project.css"
import { TaskCardForUser, TaskCardForAdmin, NewTask } from "../Tasks/Tasks.jsx";
import axios from "axios";

export function ProjectCard(props){

    return(
        <div className="project-card">
            <h1>{props.details.projectname.toUpperCase()}</h1>
            <div className="p">
                <p>Created On</p>
                <p>{props.details.createdon.split("T")[0]}</p>
            </div>
        </div>
    )

}

export function InsideProject(props){

    const navigate = useNavigate()
    const Location = useLocation()

    const [email, setEmail] = useState("");
    const [user, setUser] = useState({
        username:"",
        admin:false
    })
    const [data, setData] = useState({
        projectname:"",
        tasks:[]
    })
    const [newTask, setNewTask] = useState(false)
    const [relode, setRelode] = useState(false)

    function forNewTask(){
        setNewTask(false);
        getAdminTasks()

    }

    function forTaskCompleted(){
        setRelode(!relode)
    }

    function setStates(){

        setEmail(Location.state.email)
        setUser(Location.state.user)
        if(Location.state.user.admin){
            setData(Location.state.project)
        }else{
            setData({
                ...Location.state.project,
                tasks:[]
            })
        }

    }

    async function getAdminTasks(){

        const result = await axios.get("http://localhost:3000/api/v1/data/admin/get/single/project",
            {
                params:{
                    projectid:Location.state.project.projectid
                }
            }
        )
        if(result.data.status === 201){
            setData(result.data.result)
        }

    }

    async function getUserTasks(email, project){
        const result = await axios.get("http://localhost:3000/api/v1/data/user/get/projects/tasks",
            {
                params:{
                    email:email,
                    project:project
                }
            }
        )
        if(result.data.status === 201){
            setData({
            ...Location.state.project,
            tasks:[...result.data.result]
        })
        }
    }

    useEffect(()=>{
        if(Location.state === null || Location.state.email.length === 0){
            window.alert("Unauthorized! Redirecting To login Page")
            navigate("/")
          } else {
            setStates()
            if(!Location.state.user.admin){
                getUserTasks(Location.state.email, Location.state.project.projectname)

            } else{
                getAdminTasks()
            }
          }
          console.log(data);
    },[relode])

    return (
        <div className="project-conatiner"> 
            <div className="project-header">

                <h1>{data.projectname.toUpperCase()}</h1>
                <div className='buttons'>
                <button onClick={()=>{
                    navigate("/home",{
                        replace:true,
                        state:{
                            email:email
                        }
                    })
                }}>Back</button>
                {user.admin && <button onClick={
                    ()=>{
                        setNewTask(!newTask)
                    }
                    }>{newTask?"Cancel":"New Task"}</button>}
                </div>

            </div><hr />
            <div>
                {
                    newTask && <NewTask 
                    onAdd={forNewTask}
                    projectid={data.projectid}/>
                }
            </div>
            <div className="task-container">{
                data.tasks?.map((item,indx)=>(
                    user.admin?<TaskCardForAdmin key={indx} task={item} />:
                    <TaskCardForUser key={indx} taskCompleted={forTaskCompleted} projectid={data.projectid} task={item} />
                ))
            }</div>
        </div>
    )

}