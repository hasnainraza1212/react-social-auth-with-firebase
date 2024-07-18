import React, {useEffect} from 'react'
import {getAuth, app} from "./../../Firebase/Firebase"
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material'
import moment from 'moment';
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      background: {
        default: '#121212',
        paper: '#424242',
      },
      text: {
        primary: '#ffffff',
        secondary: '#cfd8dc',
      },
    },
  });

const UserInfo = () => {

    const navigate = useNavigate()
    const auth = getAuth(app)
    const handleSignOut = ()=>{
      auth.signOut()
      localStorage.removeItem("Auth")
      navigate('/login', {replace:true})
    }
    const user = JSON.parse(localStorage.getItem("user"))

    const UserCardField = ({
        field,
        value
    })=> <Box sx={{
        display:"flex",
        alignItems:"centers",
        gap:"10px"
    }}>
        <Typography >{field}</Typography>
        <Typography>{value}</Typography>
    </Box>


  return (
    <Box sx={{
        width:"100%",
        height:"100dvh",
        background:"black",
        positions:"relative",
        display:"grid",
        placeContent:"center"
    }}>
    <Box sx={{
        color:"#dddcdc"
      }}>
        <Box sx={{
            padding:"20px !important",
            borderRadius:"12px",
            border:"1px solid white",
            minWidth:"500px",
            display:"flex",
            flexDirection:"column",
            gap:"20px"
        }}>
               <UserCardField field={"Name : "} value={user?.displayName}/>
               <UserCardField field={"Email : "} value={user?.email}/>
               <UserCardField field={"Email Verified : "} value={user?.emailVerified?"true":"false"}/>
               <UserCardField field={"Provider  :"} value={user.providerData[0].providerId}/>
               <UserCardField field={"Last Login At :"} value={moment(parseInt(user.lastLoginAt)).fromNow()}/>
               <UserCardField field={"UID : "} value={user.uid}/>
              
        </Box>

      </Box>

      <Button
        
        onClick={handleSignOut}
        sx={{
          color:"white",
          position:"absolute",
          right:"20px",
          top:"20px",
           padding:"20px 40px !important",
        }} variant='outline'>Logout</Button>
         
    </Box>
  )
}

export default UserInfo