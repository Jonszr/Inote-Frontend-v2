import React, { useEffect, useState } from "react";
import Banner from "../../components/MyblogPage/Banner";

import ProfileCard from "../../components/MyblogPage/ProfileCard";

import { Outlet, useLocation, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useSelector } from "react-redux";

import {
  useGetPostsByUserQuery,
  useGetuserByIdQuery,
  useGetuserByNameQuery,
} from "../../store/userApi";
import Loading from "../Loading";
import NotFound from "../NotFound";

export default function Myblog() {
  const { currUser } = useSelector((state) => state.user);
  const { username } = useParams();


  const [isUser, setIsUser] = useState(false);
  
  const loginUserId = currUser?._id;
  
  const {
    data,
    isError: isCurrUserError,
    isLoading: isCurrUserLoading,
    isSuccess:isCurrUserSuccess
  } = useGetuserByNameQuery(username,{skip:!username});
  console.log(username);

  
  useEffect(()=>{
    if(isCurrUserSuccess){
      setIsUser(data._id === loginUserId);
    }
  },[data])
  
  const {
    data: loginUserData,
    isLoading: isLoginUserLoading,
  } = useGetuserByIdQuery(loginUserId, { skip: !loginUserId });
  const {
    isSuccess: isPostsSuccess,
    error: postsError,
    isError: isPostsError,
    data: postsdata,
    isLoading: isPostsLoading,
  } = useGetPostsByUserQuery(data?._id,{skip:!data});


  const handleScrollUp = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      {isCurrUserError || (isPostsError && <NotFound />)}
      {isCurrUserLoading || isPostsLoading || isLoginUserLoading ? (
        <Loading />
      ) : (
        <div className="h-auto bg-zinc-200">
          <div className=" flex pt-20">
            <div className=" h-auto w-screen flex flex-col md:px-[15%] px-0 gap-y-4">
              <div className="h-auto ">
                <Banner data={data} />
              </div>
              <div className="h-auto flex flex-row flex-wrap lg:flex-nowrap lg:flex lg:gap-4">
                <div className="w-full h-auto lg:order-1 lg:w-full mb-20 order-2 lg:max-w-[70%] lg:p-0 ">
                  <Outlet
                    context={{
                      userid:data._id,
                      data,
                      isUser,
                      isPostsSuccess,
                      postsError,
                      postsdata,
                    }}
                  />
                </div>

                <div className=" w-full  h-auto lg:order-2 lg:w-[30%] mb-20 order-1">
                  {/* side bar */}

                  <div className="w-full sticky top-40">
                    <ProfileCard
                      isUser={isUser}
                      loginUserData={loginUserData ? loginUserData : null}
                      data={data}
                      postsdata={postsdata}
                    />
                    <SideBar isUser={isUser} />
                  </div>
                </div>
              </div>
              <div
                onClick={handleScrollUp}
                className=" flex justify-center items-center w-10 h-10 sticky bottom-[10%] rounded-full left-[90%] bg-white border border-solid  mb-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-10 hover:h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7l4-4m0 0l4 4m-4-4v18"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
