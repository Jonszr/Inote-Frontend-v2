import React ,{memo} from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useOutlet, useOutletContext, useParams } from 'react-router-dom'

const NeedAuth = (props)=> {
    
    const location = useLocation();
    const {userid} = useOutletContext();
    const userInfo = useSelector(state => state.user)
   return userInfo.currUser._id === userid? props.children : 
   <Navigate 
   to={'/home'} 
   replace
   state={{preLocation:location}}
   />
}
export default memo(NeedAuth);