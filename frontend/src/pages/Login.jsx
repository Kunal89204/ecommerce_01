import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {username, email, password}
    axios.post("http://localhost:3000/users/login", data)
    .then((response) => {
        console.log(response.data)
        if (response.data.userInfo.username && response.data.userInfo._id) {
            localStorage.setItem("username", response.data.userInfo.username)
            localStorage.setItem("userid", response.data.userInfo._id)
        }
        navigate(`/${response.data.userInfo.username}`)
    }).catch((error) => {
        console.log(error)
  })
}
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='border rounded-xl overflow-hidden w-1/3'>
            <h1 className='text-center text-4xl py-10 text-white bg-blue-950'>Login</h1>
      <form onSubmit={handleSubmit} className='pt-8 pb-6 px-2'>
        <div  className='w-full'>
            <label htmlFor="username" className='block text-gray-500'>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='border-b-2 w-full mb-6' />
        </div>
        <div className='w-full'>
            <label htmlFor="email" className='block text-gray-500'>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border-b-2 w-full mb-6' />
        </div>
        <div className='w-full'>
            <label htmlFor="email" className='block text-gray-500'>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-b-2 w-full mb-6' />
        </div>

        <div className='text-center pt-2'><button type="submit" className='py-2 px-10 rounded bg-blue-950 text-white'>Login</button></div>
      </form>
    </div>
    </div>
  )
}

export default Login
