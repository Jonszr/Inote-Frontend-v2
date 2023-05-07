import { useIsAuthMutation } from "../store/userApi";
import { useCallback, useEffect } from "react";
import { logout, setUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const IsUserAuth = () => {
    const [isAuth,{ isSuccess, data, error, isLoading, isFetching, isError }] =
    useIsAuthMutation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  //check the current user exists in the database
  const isUserAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    console.log('check user...')
    if (token) {
      isAuth({ token: token })
        .then((resolve) => {
          console.log("isUserAuth");
          if (resolve && resolve.error) {
            console.log(resolve.error);
            dispatch(logout());
            return;
          }

          if (resolve && resolve.data) {
            const { user } = resolve.data;

            dispatch(setUser({ user }));
            return;
          }
          dispatch(logout());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(logout());
    }
  }, [dispatch, isAuth,data]);
// setup the signout time
  useEffect(() => {
    var timer = undefined;
    if (userInfo.token) {
      const timeout = userInfo.expirationTime - Date.now();
      //if time lower than 60s then signout right away.
      if (timeout < 6000) {
        dispatch(logout());
      }
      //set time to signout
      timer = setTimeout(() => {
        dispatch(logout());
      }, timeout);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [userInfo.token]);

  useEffect(() => {
    //stoping user change calue from storage
    window.addEventListener("storage", (e) => {
      localStorage.setItem(e.key, e.oldValue);
    });
  }, [isUserAuth]);
}

export default IsUserAuth