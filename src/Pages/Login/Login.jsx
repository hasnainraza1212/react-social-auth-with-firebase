import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth,app, signInWithPopup, FacebookAuthProvider ,setPersistence, browserLocalPersistence } from '../../Firebase/Firebase';
import {Box, Button} from '@mui/material';
const Login = () => {
    const navigate = useNavigate()
    const [loadingFB, setLoadingFB] = useState(false)
    const [loadingGoogle, setLoadingGoogle] = useState(false)


    const auth = getAuth(app);
    const GoogleProvider = new GoogleAuthProvider()
    const FBProvider = new FacebookAuthProvider()
    GoogleProvider.setCustomParameters({
        prompt: 'select_account'  // This forces the account selection every time
      });
      FBProvider.setCustomParameters({
        prompt: 'select_account'  // This forces the account selection every time
      });
    
    const handleAuth = async()=>{
        setLoadingGoogle(true)
        try{
            await setPersistence(auth, browserLocalPersistence)
            const response = await signInWithPopup(auth, GoogleProvider)
            const user =  response.user
            const token = await user.getIdToken()
            localStorage.setItem("Auth", true)
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/")

        }
        catch(error){
            console.log(error)
        }
        setLoadingGoogle(false)

      
    }

    const handleFBAuth = async()=>{
        setLoadingFB(true)
        try{
            await setPersistence(auth,browserLocalPersistence)

            const response = await signInWithPopup(auth, FBProvider)
            const user =  response.user
            const token = await user.getIdToken()
            localStorage.setItem("Auth", true)
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/")

        }
        catch(error){
            console.log(error)
        }
        setLoadingFB(false)

      
    }
    
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          navigate("/", {replace:true})
        }
      })
    },[])
    
  return (
    <Box sx={{
        width:"100%",
        height:"100dvh",
        display:"grid",
        background:"black",
        placeContent:"center",
        color:"white"
    }}>
        <Button
        
        onClick={handleAuth}
        sx={{
           padding:"20px 40px !important",
           border:"1px solid white"
        }} variant='outline'>{loadingGoogle? "signing...":"Sign in with Google"}</Button>
         <Button
        
        onClick={handleFBAuth}
        sx={{
            mt:"20px !important",
           border:"1px solid white",
           padding:"20px 40px !important"
        }} variant='outline'>{loadingFB? "signing...":"Sign in with FaceBook"}</Button>
    </Box>
  )
}

export default Login



