import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useParams } from 'react-router-dom'

const NeedLogin = (props)=> {
    
    const location = useLocation();
    const param = useParams();
    const userInfo = useSelector(state => state.user)
   return userInfo.isLogin? props.children : 
   <Navigate 
   to={'/auth/signin'} 
   replace
   state={{preLocation:location}}
   />
}
export default NeedLogin;