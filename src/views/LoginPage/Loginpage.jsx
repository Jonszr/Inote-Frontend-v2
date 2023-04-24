import React from 'react'
import { Link, Outlet, useLocation, useMatch, useParams } from 'react-router-dom'
import Signin from '../../components/LoginPage/Signin'
import Signup from '../../components/LoginPage/Signup'

export default function Loginpage(props) {
    
  return (
    <div className='w-full h-screen overflow-y-scroll  '>
        
      <div className="container mx-auto px-4 h-full my-32">
        <div className="flex content-center items-center justify-center h-full">
          
          
          <Outlet/>
        </div>
      </div>
        
        

    </div>
  )
}
