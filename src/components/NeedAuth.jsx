import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useParams } from 'react-router-dom'

const NeedAuth = (props)=> {
    
    const location = useLocation();
    const param = useParams();
    console.log(param.userid)
    // console.log(param)
    // console.log(location)
    const userInfo = useSelector(state => state.user)
   return userInfo.currUser._id === param.userid? props.children : 
   <Navigate 
   to={'/home'} 
   replace
   state={{preLocation:location}}
   />
}
export default NeedAuth;