
import Navbar from "./components/Navbar";
import Footer from './components/Footer'

import { useNavigate, useRoutes } from "react-router-dom";

import routes from "./routes/routes";
import { useIsAuthMutation, useUpdateUserMutation } from "./store/userApi";
import { useCallback, useEffect, useRef, useState } from "react";
import img from './assets/imgcard.jpg'
import { logout, login, setUser } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./views/Loading";
import NotFound from "./views/NotFound";




const App = () => {
  const UsemainRoutes = () => {
    const mainRoutes = useRoutes(routes);
    return mainRoutes
  }
  const [isAuth, { isSuccess, data, error, isLoading, isFetching, isError }] = useIsAuthMutation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user)

  const isUserAuth = useCallback(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    if (token) {

      isAuth({ token: token }).then((resolve) => {

        console.log('isUserAuth')
        if (resolve && resolve.error) {
          console.log(resolve.error)
          dispatch(logout());
          // navigate('/auth/signin');
          return;

        }

        if (resolve && resolve.data) {
          const { user } = resolve.data;

          dispatch(setUser({ user }))
          return;
        }
        dispatch(logout());

      }).catch(err => {
        console.log(err)
      });
    } else {
      console.log('logout')
      // setIslog(true);
      dispatch(logout());
    }
  }, [dispatch, isAuth])


  useEffect(() => {
    var timer = undefined;
    if (userInfo.token) {
      const timeout = userInfo.expirationTime - Date.now();
      console.log(timeout)
      console.log(userInfo)
      if (timeout < 6000) {
        dispatch(logout())
      }
      timer = setTimeout(() => {
        dispatch(logout())
      }, timeout)

      console.log('updated')
    }

    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [userInfo.expirationTime, userInfo.token, dispatch])


  useEffect(() => {
    console.log('mounted')
    window.addEventListener('storage',(e)=>{
      localStorage.setItem(e.key,e.oldValue);
    })
    // isUserAuth();
  }, [isUserAuth])

  return (
    <>

      {!isLoading ? <><Navbar />
        <UsemainRoutes />
        <Footer /></> : (isError ? <NotFound /> : <Loading />)}


    </>
  );
}


export default App;
