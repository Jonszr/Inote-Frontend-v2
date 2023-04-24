import React, { useEffect, useRef, useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultImg from "../assets/imgcard.jpg";
import { logout } from "../store/userSlice";
export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currUser);
  //small screen nav bar click to show menu
  const [nav, setNav] = useState(false);
  const [imgNav, setImgNav] = useState(false);
  const dispatch = useDispatch();

  const handleimgMenuOpen = (e) => {
    setImgNav(true);
  };
  const handleimgMenuClose = (e) => {
    setImgNav(false);
  };
  const handleimgMenuSwitch = (e) => {
    setImgNav(!imgNav);
  };

  const handleClick = () => {
    setNav(!nav);
  };

  const handleSignout = () => {
    dispatch(logout());
    // setNav(!imgNav);
    navigate("/home", { replace: true });
  };

  // useEffect(() => {
  // });

  return (
    <div className="w-screen h-[90px] z-10 bg-zinc-900 fixed  drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center ">
          <h1 className="text-3xl text-white font-bold mr-4 ml-10 sm:text-4xl">
            INOTE.
          </h1>
          <ul className="hidden md:flex list-none text-zinc-400">
            <li>
              <NavLink to={"/home"}>Home</NavLink>
            </li>

            {/* <li>
              <NavLink to={"/usercenter"}>My Blogs</NavLink>
            </li> */}
          </ul>
        </div>

        <div className={currentUser ? "hidden" : "hidden md:flex  mr-12"}>
          <button
            onClick={() => {
              handleimgMenuClose();
              navigate("/auth/signin")
            }}
            className="px-8 py-3 "
          >
            Sign In
          </button>
        </div>
        {currentUser && (
          <div
            className={"mr-4 md:mr-12 py-3  hover:cursor-pointer"}
            onMouseEnter={handleimgMenuOpen}
            onClick={handleimgMenuSwitch}
          >
            <img
              id="nihao"
              className=" object-cover w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={currentUser.photo ? currentUser.photo.photoURL : defaultImg}
              alt="Bordered avatar"
            />
          </div>
        )}

        {!currentUser && (
          <div className="md:hidden" onClick={handleClick}>
            {!nav ? (
              <MenuIcon className="w-10 text-white mr-4" />
            ) : (
              <XIcon className="w-10 text-white mr-4" />
            )}
          </div>
        )}
      </div>
      {/* image menu */}
      {imgNav&&currentUser && (
        <ul
          onPointerLeave={handleimgMenuClose}
          className={
            "absolute bg-zinc-600 list-none  right-12  w-[300px] px-8 "
          }
        >
          <li className="p-4 border-b-2 border-zinc-300 w-full">
            <NavLink to={"/home"}>Home</NavLink>
          </li>
          <li className=" p-4 border-b-2 border-zinc-300   w-full">
            <NavLink to={`/usercenter/${currentUser._id}`}>My Blogs</NavLink>
          </li>
          <div className="flex flex-col my-4">
            <NavLink onClick={handleSignout} to={"/home"}>
              <button className="px-8 py-3 w-full">logout</button>
            </NavLink>
          </div>
        </ul>
      )}

      {/* small screen menu */}

      <ul className={!nav ? "hidden" : "absolute bg-zinc-200 list-none   w-full px-8"}>
        <li className=" p-4 border-b-2 border-zinc-300 w-full">
          <NavLink onClick={handleClick} to={"/home"}>
            Home
          </NavLink>
        </li>

        <div className=" p-4 flex flex-col my-4">
          <button className="px-8 py-3">
            <NavLink onClick={handleClick} to={"/auth/signin"}>
              Login
            </NavLink>
          </button>
        </div>
      </ul>
    </div>
  );
}
