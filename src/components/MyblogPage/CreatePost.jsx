import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useCreatePostMutation } from "../../store/userApi";
import BlogEditor from "./BlogEditor";

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const { userid} = useOutletContext();
  const {username } = useParams();
  const navigate = useNavigate();

  const setPostContent = (content) => {
    setContent(content);
  };
  const [createPost,{}] = useCreatePostMutation();
  const onPostSubmit = (e)=>{
    e.preventDefault()
    const [postTitle,photo,content] = e.target;
    const post = new FormData();
    //console.log(postTitle.value,content.value,photo.files[0])
    if(!postTitle.value&&!content.value&&!photo.files[0]){
      console.log('you must fill all content')
      return;
    }
    if(photo.files[0]){
      
      post.append("photo",photo.files[0])
    }
    postTitle.value&&post.append('title',postTitle.value);
    content.value&&post.append('body',content.value);
    createPost({userId:userid,post:post})
    navigate("/usercenter/" + username);
  }

  return (
    <div className="flex-col bg-white mt-20 rounded-lg p-5">
      <form onSubmit={onPostSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label
              
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Post Title
            </label>
            <input
              type="text"
              
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type your post title here...."
              required
            />
          </div>
          <div>
            <label
              
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Cover Image
            </label>
            <input
              type={'image'}
             
              
              
              required
            />
          </div>
          <div>
            <label
             
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Content:
            </label>
            
            <input
              type={'hidden'}
              value={content}
              onChange={()=>{}}
              
              required
            />
          </div>
          
        </div>
        <BlogEditor setPostContent={setPostContent}/>
        
        <button
          type="submit"
          
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
