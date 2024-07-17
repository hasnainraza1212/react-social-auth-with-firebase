import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {getAuth, app} from "./../../Firebase/Firebase"
const Protected = ({
    children
}) => {
  const auth = getAuth(app)
    const navigate = useNavigate()
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(!user){
          navigate("/login", {replace:true})
        }
      })
    },[])
   

  return (
    <div>{children}</div>
  )
}

export default Protected