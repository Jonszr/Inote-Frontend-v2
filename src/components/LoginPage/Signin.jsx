import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/userApi";
import { login } from "../../store/userSlice";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signin, { isError, isSuccess, isLoading, data }] = useLoginMutation();

  const location = useLocation()
  const from = location.state?.preLocation?.pathname || '/home';
  


  const handleSignin = (e) => {
    e.preventDefault();
    console.log(from);
    const user = { email: e.target[0].value, password: e.target[1].value };
    if (user.email&&user.password) {
      signin({ email: user.email, password: user.password }).then(
        (result) => {
          console.log(result.data)
          
            if(result.data){
              dispatch(login(result.data));
              navigate(from,{replace:true}) 
            }
            if(result.error){
              console.log(result.error)
            }
        }
      ).catch(err=>{
        console.log(err)
      });
    }
  };

  return (
    <div className="w-full xl:w-7/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
        {isError && (
          <div
            className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <svg
              className="inline flex-shrink-0 mr-3 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div>
              <span className="font-medium">login Failed!</span> Account is not
              existing or password is wrong.
            </div>
          </div>
        )}

        <div className="rounded-t mb-0 px-6 py-6">
          <div className="text-center mb-3">
            <h6 className="text-blueGray-500 text-sm font-bold">
              Sign in with
            </h6>
          </div>
          <div className="btn-wrapper text-center">
            <button
              className="bg-white text-indigo-600 active:bg-blueGray-50 text-blueGray-700  px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img
                alt="..."
                className="w-5 mr-1 "
                src={require("../../assets//github.svg").default}
              />
              Github
            </button>
            <button
              className="bg-indigo-600 active:bg-blueGray-50 text-blueGray-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img
                alt="..."
                className="w-5 mr-1"
                src={require("../../assets/google.svg").default}
              />
              Google
            </button>
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div className="text-blueGray-400 text-center mb-3 font-bold">
            <small>Or sign in with credentials</small>
          </div>
          <form onSubmit={handleSignin}>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                type="email"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Email"
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                type="password"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
              />
            </div>
            {/* <div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  id="customCheckLogin"
                  type="checkbox"
                  className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
                <span className="ml-2 text-sm font-semibold text-blueGray-600">
                  Remember me
                </span>
              </label>
            </div> */}

            <div className="text-center mt-6 ">
              <button
                type="submit"
                className=" bg-indigo-600  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-wrap mt-6 relative">
        <div className="w-1/2">
          <NavLink to="/auth/forgetpwd" className="text-blueGray-200">
            <small>Forget Password?</small>
          </NavLink>
        </div>
        <div className="w-1/2 text-right">
          <NavLink to='/auth/signup' className="text-blueGray-200">
            <small>Create new account</small>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
