import React from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.min.css";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import img from "../../assets/imgcard.jpg";
import CommentCard from "./CommentCard";
import NotFound from "../../views/NotFound";
export default function BlogContent() {
  const { postsdata } = useOutletContext();
  const { blogid } = useParams();
  const [currPost, setCurrPost] = useState(null);
  const [date, setDate] = useState('');
  useEffect(() => {
    Prism.highlightAll();
    const tempdata = postsdata.find((post) => post._id === blogid);
    setDate(new Date(tempdata.created).toLocaleDateString())
    setCurrPost(tempdata);
  }, [postsdata]);

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
                src={img}
                alt="Rounded avatar"
              />
              <div className="text-center text-md self-center  ml-5">
                <p className=" ">Author: {currPost.postedBy.name}</p>
                <p className=" ">
                  Created Date:
                  {/* {`${createdate[1]}-${createdate[2]}-${createdate[3]}`} */}
                </p>
                <p className="">{date}</p>
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

            <div className=" grid grid-cols-1 divide-y border border-zinc-300 px-8 my-8 rounded-2xl">
              <CommentCard />
              {/* <CommentCard />
              <CommentCard />
              <CommentCard /> */}
            </div>

            <div className=" border border-zinc-300 p-8 my-8 rounded-2xl">
              <form>
                <label className="sr-only">Your message</label>
                <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <textarea
                    id="chat"
                    rows="1"
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your message..."
                  ></textarea>
                  <button
                    type="submit"
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-6 h-6 rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
