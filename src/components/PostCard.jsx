import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import imgCard from "../assets/DefaultHeadimg.jpg";
import { useDeletePostMutation } from "../store/userApi";
import { useGetuserByIdQuery } from "../store/userApi";
export default function PostCard({ post,isUser}) {
  var createdate = new Date(post.created);
  createdate = createdate.toString().split(" ");
  const [menu,setMenu] = useState(false);
  const [deletePost,{}] = useDeletePostMutation();
  
  const handleDeletePost = ()=>{
    console.log(post._id)
    setMenu(false)
    deletePost({postId:post._id})
    
  }
  const handleOpenMenu = ()=>{
    setMenu(true)
  }
  const handleCloseMenu = ()=>{
    setMenu(false)
}
const handleSwitchMenu = ()=>{
    setMenu(!menu);
}

  return (
    <div className="w-full relative">
      <div className="w-full overflow-hidden shadow-lg rounded-xl h-90  md:w-auto  m-auto">
      <NavLink to={`/usercenter/${post.postedBy._id}/blogdetail/${post._id}`}>
        <img
          alt="blog photo"
          src={post.photo? post.photo.photoURL:imgCard}
          className="max-h-40 cursor-pointer w-full object-cover"
        />
        </NavLink>
        
        <div className="bg-white dark:bg-gray-800 w-full p-4">
        <NavLink to={`/usercenter/${post.postedBy._id}/blogdetail/${post._id}`}>
          {/* <p className="text-indigo-500 text-md font-medium">
                              Video
                          </p> */}
          <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
            {post.title}
          </p>
          <p dangerouslySetInnerHTML={{__html:post.body}} className="truncate w-50 h-6 text-gray-400 dark:text-gray-300 font-light text-md">
            
          </p>
          </NavLink>
          <div className=" relative flex items-center mt-4">
          <NavLink to={`/usercenter/${post.postedBy._id}/blogdetail/${post._id}`}>
            {/* <div className="block relative">
              <img
                alt="profil"
                src={imgCard}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </div> */}

            <div className="flex flex-col justify-between text-sm">
              <p className="text-gray-800 dark:text-white">
                {post.postedBy.name}
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                {`created at ${createdate[1]}-${createdate[2]}-${createdate[3]}`}
              </p>
            </div>
            </NavLink>
            {isUser&&<button onClick={handleSwitchMenu} className=" absolute right-0 text-zinc-500 bg-white hover:text-zinc-800 border-none  font-medium rounded-lg text-sm  py-2.5 text-center inline-flex items-center  ">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>}
          </div>
        </div>
      
      </div>
      {menu && <div onPointerLeave={handleCloseMenu} className="absolute bottom--10 right-0 z-10 max-w-44 w-22 bg-white rounded divide-y divide-gray-100 shadow">
        <ul  className="py-1 text-sm text-gray-700">
          <li onClick={handleDeletePost} className=" cursor-pointer block py-2 px-4 text-red-600 text-center hover:bg-red-600 hover:text-white">Delete</li>
        </ul>
      </div>}
      
    </div>
  );
}
