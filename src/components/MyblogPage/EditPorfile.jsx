import { computeHeadingLevel } from "@testing-library/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useUpdateUserMutation } from "../../store/userApi";

export default function () {
  const navigate = useNavigate();
  const { isUser, data} = useOutletContext();
  const [updateUser, { isLoading,data:fetchdata,isSuccess}] = useUpdateUserMutation();
  const [img, setImg] = useState();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const [photo,name,email,about] = e.target;
    const user = new FormData();

    if(photo.files[0]){
      
      user.append("photo",photo.files[0])
    }
    name.value && user.append("name",name.value);
    email.value && user.append("email", email.value)
    about.value && user.append("about",about.value)
    
    updateUser({ userId: data._id, user });
    navigate('/usercenter/'+data._id);
    
  };
  return (
    <>
      {data && (
        <div className="w-full mt-20  h-auto bg-white p-20 rounded-lg ">
          <form
            onSubmit={handleSubmit}
          >
            <div className="py-5">
            <label
                  
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Head Image
                </label>
              <input id='headimg' type={"file"} onChange={onImageChange}></input>
              <img src={img} alt="" />
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label
                  
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={data.name}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={data.email}
              />
            </div>
            <div className="mb-6">
              <label
                
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                About yourself
              </label>
              <input
                type={"text"}
                id="about"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={
                  data.about ? data.about : "Introduce yourself here...."
                }
              />
            </div>
            {/* <div className="mb-6">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div>
            <div className="mb-6">
              <label
                for="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirm_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div> */}

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
