import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Hero from '../../components/Hero'
import { useGetAllPublicPostsQuery } from '../../store/userApi'
import Loading from '../Loading'
import PostLists from '../../components/PostLists'

export default function Home() {
  const {
    isSuccess:isPostsSuccess,
    error:postsError,
    isError:isPostsError,
    data: postsdata,
    isLoading:isPostsLoading
  } = useGetAllPublicPostsQuery();
  return (
    <Fragment>
        <Hero/>
        <div className='flex justify-center mx-[10%] py-32'>
        {isPostsLoading? <Loading/>:<Outlet context={{isPostsSuccess,postsError,postsdata}}/>}
        </div>
        
        
    </Fragment>
    
  )
}
