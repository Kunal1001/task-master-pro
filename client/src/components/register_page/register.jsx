import React, {useState} from 'react'
import axios from "axios"
import { Form, Link, useNavigate } from 'react-router-dom'
import "./Register.css"

function Register() {

  var navigate = useNavigate();
  const [state , setState] = useState({
    username:"",
    email : "",
    userrole:"user",
    password : "",
    successMessage: null
  })
  const handleChange = (e) => {
      const {id , value} = e.target   
      setState(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload={
        "username":state.username,
        "email":state.email,
        "userrole":state.userrole,
        "password":state.password,
    }
    console.log(payload);
    axios.post('http://localhost:3000/api/v1/user/register', payload)
        .then(function (response) {
          console.log(response);
            if(response.data.status === 200){
                setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'Registration successful. Redirecting to Login page..'
                }))
                window.alert('Registration successful. Redirecting to Login page..')
                navigate('/')
            }
            else if(response.data.status === 500){
              window.alert("User already Exists")
              navigate("/register")
            }
            else{
                navigate("/")
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  return (
    <div className='register-container'>
      <h1>New Account</h1>
      <Form className='register-form-container' onSubmit={handleSubmitClick}>
      <input type="text" 
              id="username" 
              placeholder="username" 
              value={state.username}
              onChange={handleChange}
              required
        />
        <input type="email" 
              id="email" 
              placeholder="Enter email" 
              value={state.email}
              onChange={handleChange}
              required
        />
        <select id='userrole' onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        <input type="password" 
              id="password" 
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              required
        />
        <button type="submit">Register</button>
      </Form>
    </div>
  )
}


export default Register