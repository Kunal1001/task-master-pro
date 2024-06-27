import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {ProjectCard} from "../Projects/Project.jsx"
import axios from 'axios'
import "./Home.css"

function Home() {

  const [user, setUser] = useState({
    username:"",
    admin:false
  })
  const [data, setData] = useState({
    result:[]
  })
  const [newProject, setNewProject] = useState("")
  const navigate = useNavigate()
  const Location = useLocation()

  function onChange(e){
    setNewProject(e.target.value)
  }

  async function createNewProject(){
    try {

      const result = await axios
      .post("http://localhost:3000/api/v1/data/admin/post/projects", {
        email:Location.state.email,
        project:newProject
      })
      setData({
        result:[...data.result, result.data.result]
      })
      
    } catch (error) {

      console.log(error);
      
    }

  }

  async function adminData(){

    const response = await axios.get("http://localhost:3000/api/v1/data/admin/get/projects", {
      params:{
        email:Location.state.email
      }
    })
    setData(response.data);

  }


  async function userData(){

    const response = await axios.get("http://localhost:3000/api/v1/data/user/get/projects", {
      params:{
        email:Location.state.email
      }
    })
    setData(response.data);

  }


  async function userDetail(){

    const response = await axios.get("http://localhost:3000/api/v1/user/isadmin", {
      params:{
        email:Location.state.email
      }
    })
    setUser(response.data)
    if(response.data.admin){
      adminData()
    } else {
      userData()
    }

  }

  useEffect(()=>{
    if(Location.state === null || Location.state.email.length === 0){
      window.alert("Unauthorized! Redirecting To login Page")
      navigate("/")
    } else {
      userDetail()
    }
  },[data])

  return (
    <div className='home-container'>
      <div className='home-header'>
        <h1>{user.username.toUpperCase()}<span className='role'>{user.admin?"(Admin)":"(User)"}</span></h1>
        {user.admin && <div className='create-project-div'>
          <input type="text" value={newProject} onChange={onChange} placeholder='New Project'/>
          <button type='button' onClick={()=>{
            setNewProject("")
            createNewProject()}}>Create</button>
          </div>}
      </div><hr />
      <div className='project-container'>
        {
          data.result?.map((item,indx)=>(
            <div onClick={()=>(
              navigate(`/home/${item.projectname}`, {
                replace:true,
                state:{
                  email:Location.state.email,
                  user:user,
                  project:item
                }
              })
            )} key={indx}>
              
              <ProjectCard details={item} />

            </div>
            
          ))
        }
      </div>
    </div>
  )
}

export default Home