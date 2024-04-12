import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
    const {username} = useParams();
    useEffect(() => {
      if (!localStorage.getItem("userId")) {
        navigate("/login")
      }
    }, [])
  return (
    <div>
      {username}
    </div>
  )
}

export default Home
