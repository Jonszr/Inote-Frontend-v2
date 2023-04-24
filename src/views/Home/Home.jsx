import React from 'react'
import { Outlet } from 'react-router-dom'
import Hero from '../../components/Hero'
import PostLists from '../../components/PostLists'
import { useGetAllPublicPostsQuery } from '../../store/userApi'
import Loading from '../Loading'

export default function Home() {
  const {
    isSuccess:isPostsSuccess,
    error:postsError,
    isError:isPostsError,
    data: postsdata,
    isLoading:isPostsLoading
  } = useGetAllPublicPostsQuery();
  console.log(postsdata);
  
  return (
    <>
        <Hero/>
        <div className='flex justify-center mx-[10%] py-32'>
        {isPostsLoading? <Loading/>:<Outlet context={{isPostsSuccess,postsError,postsdata}}/>}
        </div>
        
        
    </>
    
  )
}
