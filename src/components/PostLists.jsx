import React, { useState } from "react";
import { useEffect } from "react";
import {
  useOutletContext,
} from "react-router-dom";
import Loading from "../views/Loading";
import NotFound from "../views/NotFound";
import PostCard from "./PostCard";
import SearchBar from "./SearchBar";

export default function PostLists() {
  const {
    isUser,
    isPostsSuccess,
    postsError,
    postsdata: posts,
  } = useOutletContext();
  const [count, setCount] = useState(0);
  const [postsdata, setPostsdata] = useState(posts.slice(0, 12));

  useEffect(() => {
    setPostsdata((pts) => {
      return posts.slice(0, 12);
    });
    console.log("posts changed");
  }, [posts]);

  return (
    <>
      {postsError && <NotFound />}
      {isPostsSuccess ? (
        <div className=" w-full h-auto">
          {/* Search Bar */}

          <SearchBar setPostsData={setPostsdata} posts={posts} />

          {/* lists of post cards */}
          <div className={postsdata.length? "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4":"flex justify-center"}>
            {postsdata.length? postsdata.map((post) => {
              return <PostCard key={post._id} post={post} isUser={isUser} />;
            }):(<div>Nothing here, Go created your own bolg!!</div>)}
          </div>

          {/* {page button} */}
          {posts.length >= 11 && (
            <div className="flex flex-wrap justify-around py-4">
              <button
                onClick={() => {
                  setCount((count) => {
                    if (count < Math.trunc(posts.length / 12)) return count;
                    count--;
                    setPostsdata(() => {
                      return posts.slice(count * 12, count * 12 + 12);
                    });
                    return count;
                  });
                }}
                className="inline-flex items-center py-2 px-4 mr-3  text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                Previous
              </button>
              <p className="text-center">Page: {count}</p>
              <button
                onClick={() => {
                  setCount((count) => {
                    if (count >= Math.trunc(posts.length / 12)) return count;
                    count++;
                    setPostsdata(() => {
                      return posts.slice(count * 12, count * 12 + 12);
                    });
                    return count;
                  });
                }}
                className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
