import React, {useState} from 'react'
import axios from "axios"
import { Form, Link, useNavigate } from 'react-router-dom'
import "./Login.css"

function Login() {

  var navigate = useNavigate();
  const [state , setState] = useState({
    email : "",
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
        "username":state.email,
        "password":state.password,
    }
    console.log(payload);
    axios.post('http://localhost:3000/api/v1/user/login', payload)
        .then(function (response) {
          console.log(response);
            if(response.data.status === 200){
                setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'Login successful. Redirecting to home page..'
                }))
                
                navigate('/home',{replace:true, state:state})
            }
            else if(response.data.status === 401){
              window.alert("User Not registered Or Wrong email/password")
              navigate("/register")
            }
            else{
                navigate("/login")
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  return (
    <div className='login-container'>
      <h1>LogIn</h1>
      <Form className='login-form-container' onSubmit={handleSubmitClick}>
        <input type="email" 
              id="email" 
              placeholder="Enter email" 
              value={state.email}
              onChange={handleChange}
              required
        />
        <input type="password" 
              id="password" 
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              required
        />
        <button type="submit">Login</button>
      </Form>
      <Link to="/register">
        <button>
          Register
        </button>
      </Link>
    </div>
  )
}


export default Login