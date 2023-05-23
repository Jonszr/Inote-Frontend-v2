import React, { useEffect } from "react";
import { useGetuserByIdQuery, useUncommentMutation } from "../../store/userApi";
import {
    
  TrashIcon
} from '@heroicons/react/solid';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CommentCard = ({ comment }) => {
  const [unComment, {}] = useUncommentMutation();
  const {userid,blogid} = useParams();
  const postedByUserId = comment.postedBy
  const userInfo= useSelector(state => state.user);
  const loginUserId = userInfo?.currUser?._id;
  const isUser = (loginUserId === userid) || (loginUserId === postedByUserId);
  const { text, postedBy, created } = comment;
  const {
    error,
    data,
    isError: isCurrUserError,
    isSuccess: isCurrUserSuccess,
    isLoading: isCurrUserLoading,
  } = useGetuserByIdQuery(postedBy);

  const handleUncomment = async ()=>{
    try {
      await unComment({postId:blogid,comment:comment}).unwrap()
    } catch (error) {
      console.log(error.data.error)
    }
  }
  return (
    <>
      
        {isCurrUserSuccess&&<div className="w-full px-0 md:px-8 md:py-4 py-2">
          <article >
            <div className="flex items-center mb-4 space-x-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={
                  data.photo
                    ? data.photo.photoURL
                    : require("../../assets/imgcard.jpg")
                }
                alt=""
              />
              <div className="space-y-1 font-medium dark:text-white">
                <p>
                  {data.name}{" "}
                  <time
                    dateTime="2014-08-16 19:00"
                    className="block text-sm text-gray-500 dark:text-gray-400"
                  >
                    Joined on {new Date(data.created).toLocaleDateString()}
                  </time>
                </p>
              </div>
              <div className="w-full flex justify-end">
              <TrashIcon onClick={handleUncomment} className={isUser? 'h-6 text-indigo-600 hover:text-indigo-300' :'hidden'}/>
              </div>
              
            </div>

            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              <p>
                Reviewed on <time dateTime="2017-03-03 19:00">{new Date(created).toLocaleDateString()}</time>
              </p>
            </footer>
            <p className="mb-2 font-light text-gray-500 dark:text-gray-400 break-words">
              {text}
            </p>
          </article>
        </div>}
      
    </>
  );
};

export default CommentCard;
