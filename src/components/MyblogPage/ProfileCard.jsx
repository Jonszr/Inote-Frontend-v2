import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import defaultimg from "../../assets/imgcard.jpg";
import { useAddFollowMutation, useGetuserByIdQuery, useRemoveFollowMutation } from "../../store/userApi";

function ProfileCard(props) {
  const { isUser,loginUserData, data,postsdata } = props;
  const { _id,name, photo, followers, following } = data;
  const [addFollow] = useAddFollowMutation();
  const [removeFollow] = useRemoveFollowMutation();
  const findUserFromFollowing = loginUserData.following.find(user =>user._id === _id)
  const findUserFromFollowers = followers.find(user => user._id === loginUserData._id)
  const isBothConnect = findUserFromFollowers&& findUserFromFollowing
  // console.log(data,loginUserData);
  // console.log(findUserFromFollowers,findUserFromFollowing,isBothConnect);

  const followUser = ()=>{
    addFollow({followId:_id})
  }
  const unFollowUser = ()=>{
    removeFollow({unfollowId:_id})
  }


  return (
    <>
      
      {data && (
        <div className="w-full mx-auto max-w-xl mt-20 rounded-lg  bg-white dark:bg-gray-800 shadow-lg px-5 py-4 text-gray-800 dark:text-gray-50 ">
          <div className="w-full pt-1 text-center -mt-16 mx-auto">
            <div className="block relative">
              <img 
                alt="profileimg"
                src={photo? photo.photoURL : defaultimg}
                
                className="mx-auto object-cover rounded-full h-20 w-20 "
              />
            </div>
          </div>
          <div className="w-full">
            <div className="text-center mb-6">
              <p className="text-gray-800 dark:text-white text-xl font-medium overflow-hidden">
                {name}
              </p>
              <p className="text-gray-400 text-xs">FullStack dev</p>
            </div>
            <div className="rounded-lg bg-pink-100 w-full dark:bg-white p-2  mb-4">
              <div className="flex items-center justify-center  gap-4 text-xs text-gray-400 dark:text-black">
                <p className="flex flex-col">
                  Blo.
                  <span className="text-black dark:text-indigo-500 font-bold">
                    {postsdata && postsdata.length}
                  </span>
                </p>
                <p className="flex flex-col">
                  Following
                  <span className="text-black dark:text-indigo-500 font-bold">
                    {following.length}
                  </span>
                </p>
                <p className="flex flex-col">
                  Followers
                  <span className="text-black dark:text-indigo-500 font-bold">
                    {followers.length}
                  </span>
                </p>
              </div>
            </div>
            {isUser ? (
              <NavLink to={"editprofile"}>
                <button
                  type="button"
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex items-center p-2 "
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className=" text-white flex-1 ml-3 whitespace-nowrap">
                    Edit Profile
                  </span>
                </button>
              </NavLink>
            ) : isBothConnect?(
              <button
                type="button"
                onClick={unFollowUser}
                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Unfollow
              </button>
            ):(
              <button
                type="button"
                onClick={followUser}
                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Follow
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default React.memo(ProfileCard);