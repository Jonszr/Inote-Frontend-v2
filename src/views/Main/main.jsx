import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
import Loading from '../Loading'
import NotFound from '../NotFound'
import { useIsAuthMutation } from '../../store/userApi';
import IsUserAuth from '../../utils/userAuth'
const Main = () => {

    const [{  isLoading, isError }] =
    useIsAuthMutation();
  //check the current user exists in the database
  IsUserAuth();
  return (
    <>
      {!isLoading ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : isError ? (
        <NotFound />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Main