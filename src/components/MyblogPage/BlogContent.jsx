import React from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.min.css";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import img from "../../assets/DefaultHeadimg.jpg";
import CommentCard from "./CommentCard";
import NotFound from "../../views/NotFound";
import CommentSender from "./CommentSender";
import { useSelector } from "react-redux";
export default function BlogContent() {
  const { postsdata, data } = useOutletContext();
  const { blogid } = useParams();
  const userInfo = useSelector(state => state.user);
  const [currPost, setCurrPost] = useState(null);
  useEffect(() => {
    const tempdata = postsdata.find((post) => post._id === blogid);
    setCurrPost(tempdata);
  }, [postsdata]);

  useEffect(()=>{
    Prism.highlightAll();
  })

  return (
    <>
      {currPost ? (
        <div className="w-full mt-4  h-auto">
          <div className="w-full h-auto p-8 bg-white rounded-lg">
            <h1 className=" py-8 font-mono font-bold text-6xl text-center">
              {currPost.title}
            </h1>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Content</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex justify-center">
              <img
                className="h-20 w-20 object-cover  rounded-full"
                src={data.photo?  data.photo.photoURL : img}
                alt="Rounded avatar"
              />
              <div className="text-center text-md self-center  ml-5">
                <p className=" ">Author: {currPost.postedBy.name}</p>
                <p className=" ">
                  Created Date:
                  {/* {`${createdate[1]}-${createdate[2]}-${createdate[3]}`} */}
                </p>
                <p className="">{new Date(currPost.created).toLocaleDateString()}</p>
              </div>
            </div>
            <div className=" p-8 rounded-lg max-w-5xl bg-white border border-zinc-300  mt-10">
              {/* <h1 className="text-lg font-bold">{currPost.body}</h1> */}
              <div
                dangerouslySetInnerHTML={{ __html: currPost.body }}
                className=" break-words  h-auto"
              ></div>
            </div>

            {/* comment interface */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Comment</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div className=" grid grid-cols-1 divide-y border border-zinc-300 px-8 my-8 rounded-2xl">
              {currPost.comments.map((comment)=><CommentCard key={comment._id} comment={comment}/>
              )}
            </div>
              <CommentSender userId={userInfo.currUser._id} postId={blogid}/>
            
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
