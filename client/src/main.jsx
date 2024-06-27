import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements
} from 'react-router-dom'
import App from './App.jsx'
import Login from './components/login_page/Login.jsx'
import './index.css'
import Home from './components/home_page/Home.jsx'
import Register from './components/register_page/register.jsx'
import { InsideProject } from './components/Projects/Project.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Login />} />
    <Route path='/home' element={<Home />}/>
    <Route path='/register' element={<Register />} />
    <Route path='/home/:projectname' element={<InsideProject />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
