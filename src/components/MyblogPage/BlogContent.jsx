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
  const { postsdata, data,userid:currUserId } = useOutletContext();
  const { blogid } = useParams();
  const userInfo = useSelector((state) => state.user);
  const userId = userInfo?.currUser?._id;
  const [currPost, setCurrPost] = useState(null);
  const [postContent, setPostContent] = useState(null);
  useEffect(() => {
    let tempdata = postsdata.find((post) => post._id === blogid);

    setPostContent(tempdata.body.replace(/&nbsp;/g, " "));
    setCurrPost(tempdata);
  }, [postsdata]);

  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <>
      {currPost ? (
        <div className="w-full mt-4  h-auto">
          <div className="w-full h-auto md:p-8 p-0 bg-white rounded-lg">
            <h1 className=" py-8 font-mono font-bold lg:text-6xl text-2xl px-2 text-center">
              {currPost.title}
            </h1>
            <div className="relative flex px-4 py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Content</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex justify-center">
              <img
                className="h-20 w-20 object-cover  rounded-full"
                src={data.photo ? data.photo.photoURL : img}
                alt="Rounded avatar"
              />
              <div className="text-center text-md self-center  ml-5">
                <p className=" ">Author: {currPost.postedBy.name}</p>
                <p className=" ">
                  Created Date:
                  {/* {`${createdate[1]}-${createdate[2]}-${createdate[3]}`} */}
                </p>
                <p className="">
                  {new Date(currPost.created).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className=" px-4 py-8 rounded-lg max-w-5xl bg-white border border-zinc-300 mt-10 text-clip">
              {/* <h1 className="text-lg font-bold">{currPost.body}</h1> */}
              <div
                dangerouslySetInnerHTML={{ __html: postContent }}
                className="break-normal max-w-full indent-5 leading-7"
              ></div>
            </div>

            {/* comment interface */}
            <div className="relative flex py-5 px-4 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Comment</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div className=" grid grid-cols-1 divide-y border border-zinc-300 px-8 my-8 rounded-2xl">
              {currPost.comments.map((comment) => (
                <CommentCard key={comment._id} currUserId={currUserId} comment={comment} />
              ))}
            </div>
            <CommentSender userId={userId} postId={blogid} />
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
